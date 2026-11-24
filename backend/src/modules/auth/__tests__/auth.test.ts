import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import fastify from 'fastify';
import { authPlugin, AuthPayload } from '@/plugins/auth';
import { healthRoute } from '@/routes/v1/health.route';
import { authRoutes } from '../routes';

describe('Auth Module', () => {
  let testApp: FastifyInstance;

  beforeAll(async () => {
    // Build a fresh app instance for testing
    testApp = fastify({
      logger: false,
    });

    await testApp.register(authPlugin);
    await testApp.register(healthRoute);
    await testApp.register(authRoutes);
    await testApp.ready();
  });

  afterAll(async () => {
    await testApp.close();
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return 401 for unauthenticated user', async () => {
      const response = await testApp.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
      });

      expect(response.statusCode).toBe(401);
      const body = JSON.parse(response.body);
      expect(body.error.code).toBe('UNAUTHENTICATED');
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    it('should return 401 when no session exists', async () => {
      const response = await testApp.inject({
        method: 'POST',
        url: '/api/v1/auth/logout',
      });

      // Logout clears the cookie, but since there's no valid session, it returns 401
      expect(response.statusCode).toBe(401);
    });
  });
});