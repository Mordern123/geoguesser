import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes';
import mapLoader from './utils/map-loader';
import './App.css';

function App() {
  const [mapsLoaded, setMapsLoaded] = useState(false);

  useEffect(() => {
    mapLoader.load()
      .then(() => setMapsLoaded(true))
      .catch(err => {
        console.error('Error loading Google Maps API:', err);
      });
  }, []);

  if (!mapsLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <AppRoutes />
          </header>
        </div>
      </Router>
    </Provider>
  );
}

export default App;