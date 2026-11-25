import { z } from 'zod';
import { Category, Rarity } from '@prisma/client';

export const CardsQuerySchema = z.object({
  search: z.string().optional(),
  category: z.nativeEnum(Category).optional(),
  rarity: z.nativeEnum(Rarity).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CardsQuery = z.infer<typeof CardsQuerySchema>;

export const CardSlugParamsSchema = z.object({
  slug: z.string().min(1, 'slug is required'),
});

export type CardSlugParams = z.infer<typeof CardSlugParamsSchema>;