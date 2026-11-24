import React from 'react';
import { FunFactCard } from './FunFactCard';
import { useAuthGate } from '../hooks/useAuthGate';
import { Heart, List, Users, Star, BarChart3, User } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user, requireAuth } = useAuthGate();

  // Navigation items - bhukos-specific labels per design.md
  const navItems = [
    { label: 'Log', icon: Heart, description: 'Record what you ate' },
    { label: 'Wishlist', icon: Star, description: 'Save for later' },
    { label: 'My Collection', icon: BarChart3, description: 'Your cards' },
    { label: 'Friends', icon: Users, description: 'Connect' },
    { label: 'Lists', icon: List, description: 'Curated lists' },
    { label: 'Profile', icon: User, description: 'Your profile' },
  ];

  const handleNavClick = (label: string) => () => {
    if (!requireAuth()) {
      // Auth modal opened - do nothing more
      return;
    }
    // User is authenticated - navigate to feature
    console.log(`Navigating to ${label}`);
    // Future: Implement actual navigation
  };

  return (
    <div className="min-h-screen bg-surface text-onSurface flex flex-col">
      {/* Header with user state */}
      <header className="border-b hairline bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display font-medium text-on-surface">Bhukos</h1>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-on-surface-variant hidden sm:block">
                  Welcome, {user.displayName || user.username}
                </span>
                {user.avatarUrl && (
                  <img
                    src={user.avatarUrl}
                    alt={user.displayName || user.username}
                    className="w-8 h-8 rounded-none border border-stone-300"
                  />
                )}
              </div>
            ) : (
              <div className="text-sm text-on-surface-variant">
                Sign in to log food and collect cards
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-display font-medium text-on-surface mb-6">
              Where food memories become collectible moments.
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
              Bhukos is a social food-tracking and collectible-card web app for foodie friend groups.
              Log your meals, collect aesthetic cards, share favorite snacks, and discover daily food history.
            </p>

            {!user && (
              <div className="bg-surface-container-low border hairline rounded-none p-6 inline-block">
                <p className="text-sm text-on-surface-variant mb-4">
                  Sign in with Google to start enjoying all features.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Today's FunFact - prominent display per design.md */}
        <section className="mb-16">
          <h3 className="text-xl font-display font-medium text-on-surface mb-6">
            Daily Food Fact
          </h3>
          <FunFactCard />
        </section>

        {/* Navigation Grid - editorial style */}
        <section>
          <h3 className="text-xl font-display font-medium text-on-surface mb-8">
            Explore
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  onClick={handleNavClick(item.label)}
                  className="border hairline rounded-none p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-on-surface">{item.label}</div>
                      <div className="text-xs text-on-surface-variant">{item.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t hairline bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-xs text-on-surface-variant text-center">
            &copy; {new Date().getFullYear()} Bhukos — A foodie community platform
          </p>
        </div>
      </footer>
    </div>
  );
};