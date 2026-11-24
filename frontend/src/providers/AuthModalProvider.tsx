import React, { createContext, useContext, useState, useCallback } from 'react';
import { GoogleOAuthModal } from '../components/GoogleOAuthModal';

interface AuthModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <AuthModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <GoogleOAuthModal isOpen={isOpen} onClose={close} />
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
};