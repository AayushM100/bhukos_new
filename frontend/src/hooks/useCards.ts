import { useQuery } from '@tanstack/react-query';
import { getCards, getCardDetail, type FoodCard, type CardsListResponse } from '../api/cards';

/**
 * Hook to fetch paginated list of cards
 */
export const useCardsList = (params: {
  search?: string;
  category?: string;
  rarity?: string;
  page?: number;
  limit?: number;
} = {}) => {
  return useQuery<CardsListResponse>({
    queryKey: ['cards', params],
    queryFn: async () => {
      return getCards({
        search: params.search,
        category: params.category as any,
        rarity: params.rarity as any,
        page: params.page,
        limit: params.limit,
      });
    },
    staleTime: 60 * 1000, // 1 minute
    retry: 3,
    enabled: true, // Always enabled for public cards
  });
};

/**
 * Hook to fetch a single card by slug
 */
export const useCardDetail = (slug: string | undefined, enabled = true) => {
  return useQuery<FoodCard>({
    queryKey: ['card', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug is required');
      return getCardDetail(slug);
    },
    staleTime: 60 * 1000, // 1 minute
    retry: 3,
    enabled: !!slug && enabled,
  });
};

/**
 * Hook to fetch cards for the landing page showcase
 * Returns a limited set of cards for the initial display
 */
export const useCardsShowcase = () => {
  return useQuery<FoodCard[]>({
    queryKey: ['cards-showcase'],
    queryFn: async () => {
      const response = await getCards({ limit: 12 });
      return response.items;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3,
  });
};