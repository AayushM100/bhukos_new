import React from 'react';
import { type Rarity } from '../api/cards';

// Rarity badge display names and symbols
export const RARITY_SYMBOLS: Record<Rarity, string> = {
  COMMON: '✦',
  UNCOMMON: '✦✦',
  RARE: '★★★',
  EPIC: '★★★★',
  LEGENDARY: '✦✦✦✦✦',
};

interface RarityBadgeProps {
  rarity: Rarity;
  className?: string;
}

export const RarityBadge: React.FC<RarityBadgeProps> = ({ rarity, className }) => {
  const rarityClasses = {
    COMMON: 'bg-rarity-common text-white',
    UNCOMMON: 'bg-rarity-uncommon text-white',
    RARE: 'bg-rarity-rare text-white',
    EPIC: 'bg-rarity-epic text-white',
    LEGENDARY: 'bg-rarity-legendary text-white',
  };

  return (
    <span className={`text-xs font-bold uppercase tracking-widest ${rarityClasses[rarity]} ${className || ''}`}>
      {RARITY_SYMBOLS[rarity]} {rarity}
    </span>
  );
};