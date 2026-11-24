const envSchema = {
  VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  VITE_APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || 'Bhukos',
};

export const env = envSchema;