import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { queryClient } from './api/client';
import { AuthProvider } from './providers/AuthProvider';
import { AuthModalProvider } from './providers/AuthModalProvider';
import App from './App';
import './index.css';
import { env } from './config/environment';

const clientId = env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.warn('VITE_GOOGLE_CLIENT_ID is not configured');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthModalProvider>
            <App />
          </AuthModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);