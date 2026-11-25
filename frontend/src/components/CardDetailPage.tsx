import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, ArrowLeft, Share2 } from 'lucide-react';
import { useAuthGate } from '../hooks/useAuthGate';
import { useCardDetail } from '../hooks/useCards';
import { RarityBadge } from './RarityBadge';
import { FoodCard } from './FoodCard';

export const CardDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, requireAuth } = useAuthGate();

  const { data: card, isLoading, isError } = useCardDetail(slug);

  const handleLog = () => {
    requireAuth();
  };

  const handleWishlist = () => {
    requireAuth();
  };

  const handleShare = async () => {
    try {
      if (navigator.share && card) {
        await navigator.share({
          title: `Bhukos: ${card.name}`,
          text: card.funQuote,
          url: `${window.location.origin}/cards/${card.slug}`,
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/cards/${card.slug}`);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface text-on-surface flex flex-col">
        <header className="border-b hairline bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link to="/" className="text-2xl font-display font-medium text-on-surface hover:text-primary transition-colors">
              Bhukos
            </Link>
          </div>
        </header>
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-1/2 bg-stone-300 rounded-none mb-4"></div>
            <div className="h-4 w-full bg-stone-300 rounded-none mb-2"></div>
            <div className="h-4 w-3/4 bg-stone-300 rounded-none"></div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !card) {
    return (
      <div className="min-h-screen bg-surface text-on-surface flex flex-col">
        <header className="border-b hairline bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link to="/" className="text-2xl font-display font-medium text-on-surface hover:text-primary transition-colors">
              Bhukos
            </Link>
          </div>
        </header>
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
          <p>Card not found.</p>
        </main>
      </div>
    );
  }

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
        <Link to="/cards" className="inline-flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Catalog
        </Link>

        {/* Card Detail View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Artwork */}
          <div className="aspect-[4/3] bg-surface rounded-none overflow-hidden border border-stone-200">
            <img
              src={card.artworkUrl}
              alt={card.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-display font-medium text-on-surface mb-4">
              {card.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <RarityBadge rarity={card.rarity} />
              {card.ratingCount > 0 && (
                <span className="text-sm text-on-surface-variant font-mono">
                  ★ {card.avgRating.toFixed(1)} ({card.ratingCount})
                </span>
              )}
            </div>

            <div className="italic text-lg text-on-surface-variant border-l-2 border-primary/30 pl-4 mb-6">
              "{card.funQuote}"
            </div>

            {/* Flavor Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
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
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleLog}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-surface hover:bg-surface-dim transition-colors rounded-none border border-primary/20"
              >
                <Heart size={16} />
                Log
              </button>
              <button
                onClick={handleWishlist}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-secondary bg-surface hover:bg-surface-dim transition-colors rounded-none border border-secondary/20"
              >
                <Star size={16} />
                Wishlist
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-on-surface-variant bg-surface-dim rounded-none hover:bg-surface transition-colors"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};