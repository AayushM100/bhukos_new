import React from 'react';
import { FunFactCard } from './FunFactCard';
import { useAuthGate } from '../hooks/useAuthGate';
import { Heart, Star, Package, Users, List, Calendar, User } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user, requireAuth } = useAuthGate();

  // Navigation items - bhukos-specific labels per design.md
  const navItems = [
    { label: 'Log', icon: Heart, description: 'Record what you ate' },
    { label: 'Wishlist', icon: Star, description: 'Save for later' },
    { label: 'My Collection', icon: Package, description: 'Your cards' },
    { label: 'Friends', icon: Users, description: 'Connect' },
    { label: 'Lists', icon: List, description: 'Curated lists' },
    { label: 'Facts', icon: Calendar, description: 'Daily food history' },
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

  const handleSignInClick = () => {
    requireAuth();
  };

  return (
    <div className="min-h-screen bg-surface text-onSurface flex flex-col">
      {/* Top Navigation Bar - Letterboxd-inspired/editorial style */}
      <header className="border-b hairline bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Bhukos Brand */}
            <a href="#" className="text-2xl font-display font-medium text-on-surface hover:text-primary transition-colors">
              Bhukos
            </a>

            {/* Nav Items - show when authenticated */}
            {user && (
              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={handleNavClick('Log')}
                  className="text-sm text-on-surfaceVariant hover:text-primary transition-colors"
                >
                  Log
                </button>
                <button
                  onClick={handleNavClick('Wishlist')}
                  className="text-sm text-on-surfaceVariant hover:text-primary transition-colors"
                >
                  Wishlist
                </button>
                <button
                  onClick={handleNavClick('My Collection')}
                  className="text-sm text-on-surfaceVariant hover:text-primary transition-colors"
                >
                  My Collection
                </button>
                <button
                  onClick={handleNavClick('Friends')}
                  className="text-sm text-on-surfaceVariant hover:text-primary transition-colors"
                >
                  Friends
                </button>
                <button
                  onClick={handleNavClick('Lists')}
                  className="text-sm text-on-surfaceVariant hover:text-primary transition-colors"
                >
                  Lists
                </button>
                <button
                  onClick={handleNavClick('Facts')}
                  className="text-sm text-on-surfaceVariant hover:text-primary transition-colors"
                >
                  Facts
                </button>
                <button
                  onClick={handleNavClick('Profile')}
                  className="text-sm text-on-surfaceVariant hover:text-primary transition-colors"
                >
                  Profile
                </button>
              </nav>
            )}

            {/* Sign In Button */}
            <button
              onClick={handleSignInClick}
              className="px-4 py-2 text-sm font-medium text-on-surface bg-primary hover:bg-primary/90 transition-colors rounded-none"
            >
              Sign In
            </button>
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

            {/* Hero CTA - clean button instead of generic box */}
            {!user && (
              <button
                onClick={handleSignInClick}
                className="px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors rounded-none"
              >
                Start Logging Food
              </button>
            )}
          </div>
        </section>

        {/* FunFacts for Foodies Section - editorial newspaper/journal layout */}
        <section className="mb-16">
          <h3 className="text-xl font-display font-medium text-on-surface mb-6">
            FunFacts for Foodies
          </h3>
          <FunFactCard />
        </section>

        {/* Editorial navigation pattern - clean, not boxed grid */}
        <section>
          <h3 className="text-xl font-display font-medium text-on-surface mb-8">
            Explore
          </h3>

          <div className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  onClick={handleNavClick(item.label)}
                  className="border hairline rounded-none p-4 cursor-pointer hover:opacity-80 transition-opacity"
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