import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Heart, Star, Search, Filter, ArrowLeft } from 'lucide-react';
import { useAuthGate } from '../hooks/useAuthGate';
import { useCardsList } from '../hooks/useCards';
import { FoodCard } from './FoodCard';
import { type Rarity, type Category } from '../api/cards';

// Rarity badge display names and symbols
const RARITY_SYMBOLS: Record<Rarity, string> = {
  COMMON: '✦',
  UNCOMMON: '✦✦',
  RARE: '★★★',
  EPIC: '★★★★',
  LEGENDARY: '✦✦✦✦✦',
};

export const CardsPage: React.FC = () => {
  const { user, requireAuth } = useAuthGate();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') as Category | null;
  const selectedRarity = searchParams.get('rarity') as Rarity | null;

  const { data, isLoading, isError } = useCardsList({
    search: searchQuery || undefined,
    category: selectedCategory || undefined,
    rarity: selectedRarity || undefined,
    page: 1,
    limit: 60,
  });

  const handleLog = (cardId: string) => () => {
    requireAuth();
  };

  const handleWishlist = (cardId: string) => () => {
    requireAuth();
  };

  // Get rarity badge color for filter pills
  const rarityColors: Record<Rarity, string> = {
    COMMON: 'bg-rarity-common text-white',
    UNCOMMON: 'bg-rarity-uncommon text-white',
    RARE: 'bg-rarity-rare text-white',
    EPIC: 'bg-rarity-epic text-white',
    LEGENDARY: 'bg-rarity-legendary text-white',
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      {/* Header */}
      <header className="border-b hairline bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-display font-medium text-on-surface hover:text-primary transition-colors">
              Bhukos
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Page Title */}
        <h1 className="text-3xl font-display font-medium text-on-surface mb-8">
          Card Catalog
        </h1>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search cards..."
                defaultValue={searchQuery}
                className="w-full pl-10 pr-4 py-2 border hairline rounded-none focus:outline-none focus:ring-2 focus:ring-primary bg-surface"
              />
            </div>
            <select
              defaultValue={selectedCategory || ''}
              className="px-3 py-2 border hairline rounded-none bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              <option value="SNACK">Snacks</option>
              <option value="DRINK">Drinks</option>
            </select>
            <select
              defaultValue={selectedRarity || ''}
              className="px-3 py-2 border hairline rounded-none bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Rarities</option>
              <option value="COMMON">Common</option>
              <option value="UNCOMMON">Uncommon</option>
              <option value="RARE">Rare</option>
              <option value="EPIC">Epic</option>
              <option value="LEGENDARY">Legendary</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((__, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-surface-dim border hairline rounded-none p-4">
                  <div className="h-4 w-3/4 bg-stone-300 rounded-none mb-3"></div>
                  <div className="h-3 w-full bg-stone-300 rounded-none mb-2"></div>
                  <div className="h-3 w-2/3 bg-stone-300 rounded-none"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isError || !data ? (
          <div className="text-center py-12 text-on-surface-variant">
            <p>Unable to load cards. Please try again later.</p>
          </div>
        ) : data.items.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant">
            <p>No cards match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.items.map((card) => (
              <div key={card.slug}>
                <FoodCard
                  card={card}
                  onClick={() => {/* Navigate to detail page will be implemented in slice 3 */}}
                  showLogButton={!!user}
                  showWishlistButton={!!user}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};