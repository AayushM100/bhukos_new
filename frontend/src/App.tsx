import React from 'react';
import { useAuth } from './providers/AuthProvider';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-onSurface">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-onsurface">
      <header className="border-b hairline">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-display">Bhukos</h1>
          {user ? (
            <p className="text-sm text-on-surface-variant">Welcome, {user.displayName || user.username}</p>
          ) : (
            <p className="text-sm text-on-surface-variant">Explore public cards and today's food fact</p>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="prose max-w-none">
          <h2 className="text-xl font-display mb-4">Welcome to Bhukos</h2>
          <p className="text-on-surface-variant">
            A social food-tracking and collectible-card web app.
            {user ? ' You are authenticated.' : ' Sign in to start logging food and collecting cards.'}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;