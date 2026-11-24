import { FastifyInstance } from 'fastify';
import { getTodaysFactHandler } from './controller';

export async function factsRoutes(fastify: FastifyInstance) {
  // Public route - get today's fun fact
  fastify.get('/api/v1/facts/today', getTodaysFactHandler);
}