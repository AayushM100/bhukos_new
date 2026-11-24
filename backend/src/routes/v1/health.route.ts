import { FastifyInstance } from 'fastify';
import { prisma } from '../../repositories/prisma';

export async function healthRoute(fastify: FastifyInstance) {
  fastify.get('/health', async (request, reply) => {
    try {
      // Check database connectivity
      await prisma.$queryRaw`SELECT 1`;

      return reply.status(200).send({
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: 'connected',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Health check failed', error);
      return reply.status(503).send({
        status: 'error',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: 'Database connection failed',
      });
    }
  });
}