import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MAP_CONFIG } from './map-config';
import './result-map.css';

const ResultMap = () => {
  const mapRef = useRef(null);
  const { actualPosition, guessedPosition } = useSelector(state => state.game);

  useEffect(() => {
    const loadMap = async () => {
      const google = window.google;
      
      const map = new google.maps.Map(mapRef.current, {
        center: actualPosition,
        zoom: MAP_CONFIG.ZOOM_LEVELS.initial,
        minZoom: MAP_CONFIG.ZOOM_LEVELS.min,
        maxZoom: MAP_CONFIG.ZOOM_LEVELS.max,
        restriction: {
            latLngBounds: MAP_CONFIG.BOUNDS,
        },
        ...MAP_CONFIG.MAP_OPTIONS,
        styles: MAP_CONFIG.STYLES,
      });

      new google.maps.Marker({
        position: actualPosition,
        map: map,
        title: "Actual Location",
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      });

      new google.maps.Marker({
        position: guessedPosition,
        map: map,
        title: "Your Guess",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      });

      new google.maps.Polyline({
        path: [actualPosition, guessedPosition],
        map: map,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(actualPosition);
      bounds.extend(guessedPosition);
      map.fitBounds(bounds);
    };

    if (actualPosition && guessedPosition) {
      loadMap();
    }
  }, [actualPosition, guessedPosition]);

  return <div ref={mapRef} className="result-map"></div>;
};

export default ResultMap;