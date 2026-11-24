import { useAuth, User } from '../providers/AuthProvider';

export interface AuthGateResult {
  requireAuth: () => boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export const useAuthGate = (): AuthGateResult => {
  const { user, isLoading } = useAuth();

  const requireAuth = () => {
    if (isLoading) return false;

    if (!user) {
      // Open Google OAuth modal popup
      // This is a placeholder - actual implementation will be in Slice 2
      console.log('Opening Google OAuth modal');
      // TODO: Open OAuth modal
      return false;
    }

    return true;
  };

  return {
    requireAuth,
    isAuthenticated: !!user,
    isLoading,
    user,
  };
};