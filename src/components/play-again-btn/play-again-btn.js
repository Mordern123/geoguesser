import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetGame } from '../../store/game-slice';
import './play-again-btn.css';

const PlayAgainButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlayAgain = () => {
    dispatch(resetGame());
    navigate('/game');
  }

  return (
    <button className="play-again-button" onClick={handlePlayAgain}>
      Play Again
    </button>
  );
};

export default PlayAgainButton;