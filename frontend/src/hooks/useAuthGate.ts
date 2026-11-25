import { useAuth, User } from '../providers/AuthProvider';
import { useAuthModal } from '../providers/AuthModalProvider';

export interface AuthGateResult {
  /** Call this when user tries to access a protected feature.
   * Returns true if authenticated (proceed with action).
   * Returns false if unauthenticated (modal should open). */
  requireAuth: () => boolean;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Whether auth status is still being determined */
  isLoading: boolean;
  /** Current user object or null */
  user: User | null;
  /** Sign out the current user */
  signOut: () => Promise<void>;
}

export const useAuthGate = (): AuthGateResult => {
  const { user, isLoading, isAuthenticated, signOut } = useAuth();
  const { open } = useAuthModal();

  const requireAuth = () => {
    if (isLoading) {
      // Don't interrupt loading state - let it resolve first
      return false;
    }

    if (isAuthenticated) {
      return true;
    }

    // User is not authenticated - open the OAuth modal
    open();
    return false;
  };

  return {
    requireAuth,
    isAuthenticated,
    isLoading,
    user,
    signOut,
  };
};