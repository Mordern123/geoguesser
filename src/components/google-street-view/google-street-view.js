import React, { useEffect, useRef, useState } from 'react';
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
                const { StreetViewPanorama, ControlPosition } = window.google.maps;

                const validPosition = { lat: 24.123751, lng: 120.675018 };

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

                const pos = panorama.getPosition();
                dispatch(setActualPosition({ lat: pos.lat(), lng: pos.lng() }));
                
            } catch (err) {
                console.error('Error initializing Street View:', err);
                setError('Failed to load Street View.');
            }
        };

        initStreetView();
    }, [dispatch]);

    if (error) {
        return <div>{error}</div>;
    }

    return <div ref={streetViewRef} style={{ height: '100vh', width: '100%' }} />;
};

export default GoogleStreetView;
