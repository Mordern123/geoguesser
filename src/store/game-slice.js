import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actualPosition: null,
  guessedPosition: null,
  score: 0,
  distance: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setActualPosition: (state, action) => {
      state.actualPosition = action.payload;
    },
    setGuessedPosition: (state, action) => {
      state.guessedPosition = action.payload;
    },
    calculateScore: (state) => {
      const google = window.google;
      if (state.actualPosition && state.guessedPosition) {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(state.actualPosition),
          new google.maps.LatLng(state.guessedPosition)
        );
        state.distance = distance;
        state.score = Math.max(5000 - distance / 1000, 0);
      }
    },
    resetGame: (state) => {
      state.guessedPosition = null;
      state.score = 0;
      state.distance = 0;
    },
  },
});

export const { setActualPosition, setGuessedPosition, calculateScore, resetGame } = gameSlice.actions;

export default gameSlice.reducer;