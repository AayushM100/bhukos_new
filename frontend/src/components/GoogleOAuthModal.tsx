import React, { useEffect, useRef, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../providers/AuthProvider';
import { X } from 'lucide-react';

interface GoogleOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleOAuthModal: React.FC<GoogleOAuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Clear error message when modal closes
  useEffect(() => {
    if (!isOpen) {
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative bg-surface-container-lowest w-full max-w-sm mx-4 p-8 rounded-none shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          {/* Google OAuth Box based on design.md - letterpress callout style */}
          <div className="border border-stone-900/25 rounded-none p-6 mb-6 bg-white">
            <div className="mb-4">
              <h2 className="text-on-surface text-lg font-display font-medium">
                Continue with Google
              </h2>
              <p className="text-on-surface-variant text-sm mt-1">
                No account? Create one in seconds
              </p>
            </div>
          </div>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (credentialResponse.credential) {
                try {
                  await signIn(credentialResponse.credential);
                  onClose();
                } catch (error) {
                  const msg = error instanceof Error ? error.message : 'Sign in failed';
                  setErrorMessage(msg);
                }
              }
            }}
            onError={() => {
              setErrorMessage('Google authentication failed. Please try again.');
            }}
            size="large"
            theme="outline"
            shape="rectangular"
          />

          {/* Error message */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-error-container rounded-none border border-error">
              <p className="text-sm text-on-error">{errorMessage}</p>
            </div>
          )}

          {/* Security subtext - from design.md */}
          <p className="text-xs text-on-surface-variant mt-4 px-4">
            No public algorithms • Acid-free digital rag
          </p>
        </div>
      </div>
    </div>
  );
};