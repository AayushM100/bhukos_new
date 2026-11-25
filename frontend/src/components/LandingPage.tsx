import React from 'react';
import { Link } from 'react-router-dom';
import { FunFactCard } from './FunFactCard';
import { FoodCard } from './FoodCard';
import { useAuthGate } from '../hooks/useAuthGate';
import { useCardsShowcase } from '../hooks/useCards';
import { Heart, Star, Package, Users, List, Calendar, User, LogOut } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user, requireAuth, signOut } = useAuthGate();

  // Navigation items - bhukos-specific labels per design.md
  const navItems = [
    { label: 'Log', icon: Heart, description: 'Record what you ate', path: '/log' },
    { label: 'Wishlist', icon: Star, description: 'Save for later', path: '/wishlist' },
    { label: 'My Collection', icon: Package, description: 'Your cards', path: '/collection' },
    { label: 'Friends', icon: Users, description: 'Connect', path: '/friends' },
    { label: 'Lists', icon: List, description: 'Curated lists', path: '/lists' },
    { label: 'Facts', icon: Calendar, description: 'Daily food history', path: '#facts' },
    { label: 'Profile', icon: User, description: 'Your profile', path: '/profile' },
  ];

  // Card showcase
  const { data: showcaseCards, isLoading: isLoadingShowcase } = useCardsShowcase();

  const handleNavClick = (path: string) => () => {
    if (path.startsWith('#')) {
      // Scroll to section
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (!user && (path === '/log' || path === '/wishlist' || path === '/collection' ||
                   path === '/friends' || path === '/lists' || path === '/profile')) {
      requireAuth();
      return;
    }
    // Navigate - will be handled by Link
  };

  const handleSignInClick = () => {
    requireAuth();
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      {/* Top Navigation Bar - Letterboxd-inspired/editorial style */}
      <header className="border-b hairline bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Bhukos Brand */}
            <Link to="/" className="text-2xl font-display font-medium text-on-surface hover:text-primary transition-colors">
              Bhukos
            </Link>

            {/* Nav Items - show when authenticated */}
            {user && (
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  to="/log"
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Log
                </Link>
                <Link
                  to="/wishlist"
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Wishlist
                </Link>
                <Link
                  to="/collection"
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  My Collection
                </Link>
                <Link
                  to="/friends"
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Friends
                </Link>
                <Link
                  to="/lists"
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Lists
                </Link>
                <Link
                  to="/facts"
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Facts
                </Link>
                <Link
                  to="/profile"
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Profile
                </Link>
                {/* User info and Sign Out */}
                <div className="flex items-center gap-2">
                  {user.avatarUrl && (
                    <img
                      src={user.avatarUrl}
                      alt={user.displayName || user.username}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-on-surface">{user.displayName || user.username}</span>
                  <button
                    onClick={signOut}
                    className="text-sm text-on-surface-variant hover:text-primary transition-colors p-1"
                    aria-label="Sign Out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </nav>
            )}

            {/* Sign In Button - only show when not authenticated */}
            {!user && (
              <button
                onClick={handleSignInClick}
                className="px-4 py-2 text-sm font-medium text-on-surface bg-primary hover:bg-primary/90 transition-colors rounded-none"
              >
                Sign In
              </button>
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

        {/* Card Showcase - Featured Collectible Cards */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-display font-medium text-on-surface">
              Featured Collectibles
            </h3>
            {user && (
              <Link
                to="/cards"
                className="text-sm text-primary hover:text-secondary transition-colors font-medium"
              >
                View All Cards
              </Link>
            )}
          </div>

          {isLoadingShowcase ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-surface-dim border hairline rounded-none p-4">
                    <div className="h-4 w-3/4 bg-stone-300 rounded-none mb-3"></div>
                    <div className="h-3 w-full bg-stone-300 rounded-none mb-2"></div>
                    <div className="h-3 w-2/3 bg-stone-300 rounded-none"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : showcaseCards && showcaseCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {showcaseCards.slice(0, 4).map((card) => (
                <Link key={card.id} to={`/cards/${card.slug}`}>
                  <FoodCard
                    card={card}
                    showLogButton={!!user}
                    showWishlistButton={!!user}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-on-surface-variant">
              <p>No cards available yet. Check back soon!</p>
            </div>
          )}
        </section>

        {/* FunFacts for Foodies Section - editorial newspaper/journal layout */}
        <section id="facts" className="mb-16">
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
              const isProtected = item.path.startsWith('/') && item.path !== '/facts' && !item.path.startsWith('#');
              const handleClick = () => {
                if (isProtected) {
                  requireAuth();
                }
              };

              // Use Link for non-protected routes, button for protected ones
              if (item.path.startsWith('#') || (!isProtected && user)) {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="border hairline rounded-none p-4 block cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={handleClick}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-on-surface">{item.label}</div>
                        <div className="text-xs text-on-surface-variant">{item.description}</div>
                      </div>
                    </div>
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  onClick={handleClick}
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