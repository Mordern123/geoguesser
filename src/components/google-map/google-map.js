import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MAP_CONFIG } from "./map-config";
import { useDispatch } from 'react-redux';
import { setGuessedPosition, calculateScore } from '../../store/game-slice';
import "./google-map.css";

const GoogleMap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [markedPosition, setMarkedPosition] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      const google = window.google;
      const map = new google.maps.Map(mapRef.current, {
        center: MAP_CONFIG.CENTER,
        zoom: MAP_CONFIG.ZOOM_LEVELS.initial,
        minZoom: MAP_CONFIG.ZOOM_LEVELS.min,
        maxZoom: MAP_CONFIG.ZOOM_LEVELS.max,
        restriction: {
          latLngBounds: MAP_CONFIG.BOUNDS,
        },
        ...MAP_CONFIG.MAP_OPTIONS,
        styles: MAP_CONFIG.STYLES,
      });

      const marker = new google.maps.Marker({
        map,
      });

      map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        marker.setPosition({ lat, lng });
        setMarkedPosition({ lat, lng });
        dispatch(setGuessedPosition({ lat, lng }));
      });
    };

    loadMap();
  }, [dispatch]);

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      container.style.width = MAP_CONFIG.CONTAINER_SIZES.large.width;
      container.style.height = MAP_CONFIG.CONTAINER_SIZES.large.height;
      container.style.opacity = 1;
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        container.style.width = MAP_CONFIG.CONTAINER_SIZES.small.width;
        container.style.height = MAP_CONFIG.CONTAINER_SIZES.small.height;
        container.style.opacity = 0.6;
      }, MAP_CONFIG.RESIZE_DELAY);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = () => {
    if (markedPosition) {
      dispatch(calculateScore());
      navigate('/result');
    }
  };

  return (
    <div className="google-map-container" ref={containerRef}>
      <div className="google-map" ref={mapRef}></div>
      <button
        onClick={handleSubmit}
        disabled={!markedPosition}
        className="submit-button"
      >
        {markedPosition ? "Guess" : "Place your pin on the map"}
      </button>
    </div>
  );
};

export default GoogleMap;