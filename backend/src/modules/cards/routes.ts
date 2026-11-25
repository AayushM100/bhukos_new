import { FastifyInstance } from 'fastify';
import { getCardsHandler, getCardBySlugHandler } from './controller';

export async function cardsRoutes(fastify: FastifyInstance) {
  // Public route - list cards with filtering and pagination
  fastify.get('/api/v1/cards', getCardsHandler);

  // Public route - get card by slug
  fastify.get('/api/v1/cards/:slug', getCardBySlugHandler);
}