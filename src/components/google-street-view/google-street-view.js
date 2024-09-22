import React, { useEffect, useRef, useState } from 'react';
import mapLoader from "../../utils/map-loader";
import REGIONS from './region';
import { STREET_VIEW_CONFIG } from './street-view-config';
import { useDispatch } from 'react-redux';
import { setActualPosition } from '../../store/game-slice';

const GoogleStreetView = () => {
    const dispatch = useDispatch();
    const streetViewRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initStreetView = async () => {
            try {
                await mapLoader.load();
                const { StreetViewPanorama, ControlPosition, StreetViewService } = window.google.maps;

                const generateRandomPosition = (region) => {
                    const lat = Math.random() * (region.maxLat - region.minLat) + region.minLat;
                    const lng = Math.random() * (region.maxLng - region.minLng) + region.minLng;
                    return { lat, lng };
                };

                const findValidStreetViewPosition = async () => {
                    const service = new StreetViewService();
                    let validPosition = null;

                    while (!validPosition) {
                        const randomRegion = REGIONS[Math.floor(Math.random() * REGIONS.length)];
                        const position = generateRandomPosition(randomRegion);

                        try {
                            validPosition = await new Promise((resolve, reject) => {
                                service.getPanorama({ location: position, radius: 50 }, (data, status) => {
                                    if (status === 'OK') {
                                        resolve(data.location.latLng);
                                    }
                                    else reject(status);
                                });
                            });
                            return validPosition;
                        } catch (error) {
                            // console.error('Street View position not found, trying again:', error);
                        }
                    }
                };

                const validPosition = await findValidStreetViewPosition();

                const panorama = new StreetViewPanorama(streetViewRef.current, {
                    position: validPosition,
                    pov: STREET_VIEW_CONFIG.POV,
                    zoom: STREET_VIEW_CONFIG.ZOOM_LEVELS,
                    ...STREET_VIEW_CONFIG.MAP_OPTIONS,
                    zoomControlOptions: {
                        position: ControlPosition.LEFT_BOTTOM
                    },
                    panControlOptions: {
                        position: ControlPosition.LEFT_BOTTOM
                    },
                });

                panorama.addListener('position_changed', () => {
                    const pos = panorama.getPosition();
                    console.log(`New position: ${pos.lat()}, ${pos.lng()}`);
                    dispatch(setActualPosition({ lat: pos.lat(), lng: pos.lng() }));
                });

            } catch (err) {
                console.error('Error initializing Street View:', err);
                setError('Failed to load Street View.');
            }
        };

        initStreetView();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return <div ref={streetViewRef} style={{ height: '100vh', width: '100%' }} />;
};

export default GoogleStreetView;
