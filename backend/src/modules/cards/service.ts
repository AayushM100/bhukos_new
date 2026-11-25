import { prisma } from '../../repositories/prisma';
import { Category, Rarity } from '@prisma/client';

export interface ListCardsParams {
  search?: string;
  category?: Category;
  rarity?: Rarity;
  page: number;
  limit: number;
}

export interface ListCardsResult {
  items: Array<{
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
  }>;
  total: number;
  page: number;
  totalPages: number;
}

export async function listCards(params: ListCardsParams): Promise<ListCardsResult> {
  const { search, category, rarity, page, limit } = params;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { slug: { contains: search, mode: 'insensitive' } },
      { flavors: { hasSome: [search.toUpperCase()] } },
    ];
  }

  if (category) {
    where.category = category;
  }

  if (rarity) {
    where.rarity = rarity;
  }

  // Execute queries in parallel for efficiency
  const [items, total] = await Promise.all([
    prisma.foodCard.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        flavors: true,
        artworkUrl: true,
        funQuote: true,
        rarity: true,
        avgRating: true,
        ratingCount: true,
        createdAt: true,
      },
    }),
    prisma.foodCard.count({ where }),
  ]);

  return {
    items: items.map((item) => ({
      ...item,
      avgRating: Number(item.avgRating),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export interface CardDetail {
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

export async function getCardBySlug(slug: string): Promise<CardDetail | null> {
  const card = await prisma.foodCard.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      flavors: true,
      artworkUrl: true,
      funQuote: true,
      rarity: true,
      avgRating: true,
      ratingCount: true,
      createdAt: true,
    },
  });

  if (!card) {
    return null;
  }

  return {
    ...card,
    avgRating: Number(card.avgRating),
  };
}