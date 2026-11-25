import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { CardsPage } from './components/CardsPage';
import { CardDetailPage } from './components/CardDetailPage';
import { FunFactCard } from './components/FunFactCard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/cards/:slug" element={<CardDetailPage />} />
        <Route path="/facts" element={<div id="facts"><FunFactCard /></div>} />
        <Route path="/log" element={<div>Log Page - Coming Soon</div>} />
        <Route path="/wishlist" element={<div>Wishlist Page - Coming Soon</div>} />
        <Route path="/collection" element={<div>My Collection Page - Coming Soon</div>} />
        <Route path="/friends" element={<div>Friends Page - Coming Soon</div>} />
        <Route path="/lists" element={<div>Lists Page - Coming Soon</div>} />
        <Route path="/profile" element={<div>Profile Page - Coming Soon</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;