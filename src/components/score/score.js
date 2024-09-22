import React from 'react';
import { useSelector } from 'react-redux';
import './score.css';

const Score = () => {
  const { score, distance } = useSelector(state => state.game);
  const maxScore = 5000;
  const scorePercentage = (score / maxScore) * 100;

  return (
    <div className="score-container">
      <div className="score-header">
        <h2>Your Score</h2>
        <span className="score-value">{Math.round(score)}</span>
      </div>
      <div className="score-bar-container">
        <div 
          className="score-bar" 
          style={{ width: `${scorePercentage}%` }}
        ></div>
      </div>
      <div className="score-footer">
        <span className="score-label">Distance</span>
        <span className="distance-value">{(distance / 1000).toFixed(2)} km</span>
      </div>
    </div>
  );
};

export default Score;
