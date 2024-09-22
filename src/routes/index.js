import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/home/home'));
const Game = lazy(() => import('../pages/game/game'));
const Result = lazy(() => import('../pages/result/result'));

const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;