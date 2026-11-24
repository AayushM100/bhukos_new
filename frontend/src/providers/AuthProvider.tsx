import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiRequest, signInWithGoogle, signOut as signOutApi } from '../api/client';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (idToken: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiRequest<{ user: User }>('/auth/me');
        setUser(response.user);
      } catch (error) {
        // Not authenticated - this is normal for initial load
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sign in with Google OAuth
  const signIn = useCallback(async (idToken: string) => {
    try {
      const response = await signInWithGoogle(idToken);
      setUser(response.user);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      await signOutApi();
      setUser(null);
    } catch (error) {
      // Even if logout fails, clear local state
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};