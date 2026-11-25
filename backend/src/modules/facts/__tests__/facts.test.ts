import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import fastify from 'fastify';
import { authPlugin } from '@/plugins/auth';
import { healthRoute } from '@/routes/v1/health.route';
import { authRoutes } from '@/modules/auth/routes';
import { factsRoutes } from '../routes';

describe('Facts Module', () => {
  let testApp: FastifyInstance;

  beforeAll(async () => {
    // Build a fresh app instance for testing
    testApp = fastify({
      logger: false,
    });

    await testApp.register(authPlugin);
    await testApp.register(healthRoute);
    await testApp.register(authRoutes);
    await testApp.register(factsRoutes);
    await testApp.ready();
  });

  afterAll(async () => {
    await testApp.close();
  });

  describe('GET /api/v1/facts/today', () => {
    it('should return 200 for public endpoint with valid fact', async () => {
      // /api/v1/facts/today is a public endpoint
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/facts/today',
      });

      // Should return 200 with fact data when DB is available
      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('factDate');
      expect(body).toHaveProperty('title');
      expect(body).toHaveProperty('summary');
      expect(body).toHaveProperty('wikipediaUrl');
    });
  });
});