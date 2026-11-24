import { QueryClient } from '@tanstack/react-query';
import { env } from '../config/environment';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: (failureCount, error: any) => {
        // Don't retry on 401 unauthorized
        if (error?.status === 401) return false;
        return failureCount < 3;
      },
    },
  },
});

export { queryClient };

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${env.VITE_API_URL}${endpoint}`;

  const config: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `HTTP ${response.status}`);
  }

  return response.json();
};

/**
 * Sign in with Google OAuth
 * @param idToken - Google ID token from @react-oauth/google
 * @returns User object on success
 */
export const signInWithGoogle = async (idToken: string): Promise<{ user: any }> => {
  return apiRequest<{ user: any }>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  });
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  await apiRequest('/auth/logout', {
    method: 'POST',
  });
};