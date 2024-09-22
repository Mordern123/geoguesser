import React from 'react';
import { useNavigate } from 'react-router-dom';
import './game-mode-menu.css';

const GameModeSelector = () => {
  const navigate = useNavigate();
  const modes = [
    { id: 'single', name: 'Single Player' },
    { id: 'multi', name: 'Multi Player' },
  ];

  const onSelectMode = (mode) => {
    switch (mode) {
      case 'single':
        navigate('/game');
        break;
      case 'multi':
      default:
        break;
    }
  }

  return (
    <div className="game-mode-selector">
      <div className="mode-buttons">
        {modes.map(mode => (
          <button 
            key={mode.id} 
            onClick={() => onSelectMode(mode.id)}
            className="mode-button"
          >
            {mode.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameModeSelector;