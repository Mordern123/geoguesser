import React from 'react';
import Score from '../../components/score/score';
import ResultMap from '../../components/result-map/result-map';
import GoHomeButton from '../../components/go-home-btn/go-home-btn';
import PlayAgainButton from '../../components/play-again-btn/play-again-btn';

const Result = () => {
  return (
    <div className="result-container">
      <ResultMap />
      <Score />
      <GoHomeButton />
      <PlayAgainButton />
    </div>
  );
};

export default Result;