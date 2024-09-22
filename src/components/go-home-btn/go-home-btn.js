import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetGame } from '../../store/game-slice';
import './go-home-btn.css';

const GoHomeButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoHome = () => {
    dispatch(resetGame());
    navigate('/');
  }

  return (
    <button className="go-home-button" onClick={handleGoHome}>
      Go to Home Page
    </button>
  );
};

export default GoHomeButton;