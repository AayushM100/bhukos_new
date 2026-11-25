import { apiRequest } from './client';

export type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
export type Category = 'SNACK' | 'DRINK';

export interface FoodCard {
  id: string;
  name: string;
  slug: string;
  category: Category;
  flavors: string[];
  artworkUrl: string;
  funQuote: string;
  rarity: Rarity;
  avgRating: number;
  ratingCount: number;
  createdAt: Date;
}

export interface FoodCardDetail extends FoodCard {}

export interface CardsListResponse {
  items: FoodCard[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CollectedCard extends FoodCard {
  loggedAt: string;
}

export interface CollectedCardsListResponse {
  items: CollectedCard[];
  stats: {
    totalUnlocked: number;
    byRarity: Record<Rarity, number>;
  };
}

/**
 * Get list of food cards with optional filtering and pagination
 */
export const getCards = async (params: {
  search?: string;
  category?: Category;
  rarity?: Rarity;
  page?: number;
  limit?: number;
} = {}): Promise<CardsListResponse> => {
  const queryParams = new URLSearchParams();

  if (params.search) queryParams.append('search', params.search);
  if (params.category) queryParams.append('category', params.category);
  if (params.rarity) queryParams.append('rarity', params.rarity);
  if (params.page) queryParams.append('page', String(params.page));
  if (params.limit) queryParams.append('limit', String(params.limit));

  const queryString = queryParams.toString();
  const endpoint = `/cards${queryString ? `?${queryString}` : ''}`;

  return apiRequest<CardsListResponse>(endpoint);
};

/**
 * Get food card detail by slug
 */
export const getCardDetail = async (slug: string): Promise<FoodCardDetail> => {
  return apiRequest<FoodCardDetail>(`/cards/${slug}`);
};

/**
 * Log a food item (requires auth)
 */
export const logFood = async (params: {
  cardId: string;
  rating?: number;
  reviewNote?: string;
  consumedAt?: string;
}): Promise<{ log: any; unlockedCard: boolean }> => {
  return apiRequest<{ log: any; unlockedCard: boolean }>(`/logs`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
};

/**
 * Add item to wishlist (requires auth)
 */
export const addToWishlist = async (cardId: string): Promise<{ id: string; cardId: string; createdAt: string }> => {
  return apiRequest<{ id: string; cardId: string; createdAt: string }>(`/wishlist`, {
    method: 'POST',
    body: JSON.stringify({ cardId }),
  });
};

/**
 * Remove item from wishlist (requires auth)
 */
export const removeFromWishlist = async (cardId: string): Promise<void> => {
  await apiRequest(`/wishlist/${cardId}`, {
    method: 'DELETE',
  });
};

/**
 * Get user's wishlist (requires auth)
 */
export const getWishlist = async (): Promise<{ items: any[] }> => {
  return apiRequest<{ items: any[] }>(`/wishlist`);
};

/**
 * Get user's collection (requires auth)
 */
export const getCollection = async (params: {
  rarity?: Rarity;
  category?: Category;
  page?: number;
  limit?: number;
} = {}): Promise<CollectedCardsListResponse> => {
  const queryParams = new URLSearchParams();

  if (params.rarity) queryParams.append('rarity', params.rarity);
  if (params.category) queryParams.append('category', params.category);
  if (params.page) queryParams.append('page', String(params.page));
  if (params.limit) queryParams.append('limit', String(params.limit));

  const queryString = queryParams.toString();
  const endpoint = `/collection/me${queryString ? `?${queryString}` : ''}`;

  return apiRequest<CollectedCardsListResponse>(endpoint);
};