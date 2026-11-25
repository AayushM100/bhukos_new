import React from 'react';
import { Heart, Star } from 'lucide-react';
import { useAuthGate } from '../hooks/useAuthGate';
import { type FoodCard as FoodCardType, type Rarity } from '../api/cards';
import { RarityBadge } from './RarityBadge';

interface FoodCardProps {
  card: FoodCardType;
  /** Optional click handler for when user clicks the card itself */
  onClick?: () => void;
  /** Show Log button (gated by auth) */
  showLogButton?: boolean;
  /** Show Wishlist button (gated by auth) */
  showWishlistButton?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  card,
  onClick,
  showLogButton = true,
  showWishlistButton = true,
}) => {
  const { requireAuth } = useAuthGate();

  // Generate item number from slug for specimen ID
  const getItemNumber = (slug: string): number => {
    // Use a stable hash of the slug for consistent item numbers
    // Use Math.abs to ensure positive number for padding
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = ((hash << 5) - hash + slug.charCodeAt(i)) & 0xffffffff;
    }
    // Ensure positive result and pad to 3 digits
    return Math.abs(hash % 99) + 1;
  };

  const handleLog = (e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuth();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuth();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) return;
    if (onClick) onClick();
  };

  // Format rating display
  const formatRating = (avgRating: number): string => {
    return avgRating.toFixed(1);
  };

  return (
    <div
      className="bg-surface-container-lowest border hairline rounded-none hover:shadow-sm transition-all duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Header - Specimen ID, Rarity, Community Score */}
      <div className="flex justify-between items-center mb-3 px-4 pt-4">
        <div className="text-xs text-on-surface-variant font-mono font-medium">
          #{getItemNumber(card.slug).toString().padStart(3, '0')}
        </div>
        <div className="flex items-center gap-2">
          <RarityBadge rarity={card.rarity} />
          {card.ratingCount > 0 && (
            <div className="text-xs text-on-surface-variant font-mono">
              ★ {formatRating(card.avgRating)} ({card.ratingCount})
            </div>
          )}
        </div>
      </div>

      {/* Artwork Frame - fixed 4:3 aspect ratio */}
      <div className="relative mb-4 px-4">
        <div className="aspect-[4/3] bg-surface rounded-none overflow-hidden border border-stone-200">
          <img
            src={card.artworkUrl}
            alt={card.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback for missing images
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                parent.innerHTML = '<div class="flex items-center justify-center h-full text-on-surface-variant text-2xl">🍽️</div>';
              }
            }}
          />
        </div>
      </div>

      {/* Title & Quote */}
      <div className="px-4 mb-3">
        <h3 className="text-lg font-display font-medium text-on-surface mb-1">
          {card.name}
        </h3>
        <div className="italic text-sm text-on-surface-variant border-l-2 border-primary/30 pl-2">
          "{card.funQuote}"
        </div>
      </div>

      {/* Flavor Tags */}
      <div className="flex flex-wrap gap-2 px-4 mb-4">
        {card.flavors.map((flavor) => (
          <span
            key={flavor}
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-2 py-0.5 bg-surface-dim rounded-none"
          >
            {flavor}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 px-4 pb-4">
        {showLogButton && (
          <button
            onClick={handleLog}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-primary bg-surface hover:bg-surface-dim transition-colors rounded-none border border-primary/20"
          >
            <Heart size={16} />
            Log
          </button>
        )}
        {showWishlistButton && (
          <button
            onClick={handleWishlist}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-secondary bg-surface hover:bg-surface-dim transition-colors rounded-none border border-secondary/20"
          >
            <Star size={16} />
            Wishlist
          </button>
        )}
      </div>
    </div>
  );
};