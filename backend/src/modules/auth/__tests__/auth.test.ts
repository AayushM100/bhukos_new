import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { FastifyInstance } from 'fastify';
import fastify from 'fastify';
import { authPlugin, AuthPayload } from '@/plugins/auth';
import { healthRoute } from '@/routes/v1/health.route';
import { authRoutes } from '../routes';
import * as googleService from '../service';

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

  describe('POST /api/v1/auth/google', () => {
    // Regression test for: Error: request.server.jwtSign is not a function
    it('should return 200 with Set-Cookie: bhukos_session when Google token is valid', async () => {
      // Mock the Google token verification to return a fake user
      const mockGoogleUser = {
        sub: 'test-google-id-123',
        email: 'test@example.com',
        name: 'Test User',
        picture: 'https://example.com/avatar.png',
      };

      vi.spyOn(googleService, 'verifyGoogleToken').mockResolvedValue(mockGoogleUser);
      vi.spyOn(googleService, 'upsertUser').mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        username: 'testuser',
        displayName: 'Test User',
        avatarUrl: 'https://example.com/avatar.png',
      });

      const response = await testApp.inject({
        method: 'POST',
        url: '/api/v1/auth/google',
        body: { idToken: 'mock-id-token' },
      });

      expect(response.statusCode).toBe(200);

      // Check for Set-Cookie header with bhukos_session
      // Fastify/inject returns set-cookie as a string when there's one cookie
      const setCookie = response.headers['set-cookie'] as string;
      expect(setCookie).toBeDefined();
      expect(setCookie).toMatch(/bhukos_session=/);

      // Verify the response body contains user info
      const body = JSON.parse(response.body);
      expect(body.user).toBeDefined();
      expect(body.user.email).toBe('test@example.com');

      vi.restoreAllMocks();
    });

    it('should verify session cookie works with GET /api/v1/auth/me', async () => {
      // Mock the Google token verification
      const mockGoogleUser = {
        sub: 'test-google-id-456',
        email: 'test2@example.com',
        name: 'Test User 2',
        picture: 'https://example.com/avatar2.png',
      };

      vi.spyOn(googleService, 'verifyGoogleToken').mockResolvedValue(mockGoogleUser);
      vi.spyOn(googleService, 'upsertUser').mockResolvedValue({
        id: 'user-456',
        email: 'test2@example.com',
        username: 'testuser2',
        displayName: 'Test User 2',
        avatarUrl: 'https://example.com/avatar2.png',
      });

      // First, get a session cookie via Google auth
      const authResponse = await testApp.inject({
        method: 'POST',
        url: '/api/v1/auth/google',
        body: { idToken: 'mock-id-token-2' },
      });

      expect(authResponse.statusCode).toBe(200);
      const cookieHeader = authResponse.headers['set-cookie'] as string;
      const cookie = cookieHeader.split(';')[0];

      // Then use that cookie to access protected route
      const meResponse = await testApp.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { cookie },
      });

      expect(meResponse.statusCode).toBe(200);
      const body = JSON.parse(meResponse.body);
      expect(body.user).toBeDefined();
      expect(body.user.email).toBe('test2@example.com');

      vi.restoreAllMocks();
    });

    it('should return 401 for invalid Google token', async () => {
      vi.spyOn(googleService, 'verifyGoogleToken').mockRejectedValue(
        new Error('Invalid Google token payload')
      );

      const response = await testApp.inject({
        method: 'POST',
        url: '/api/v1/auth/google',
        body: { idToken: 'invalid-token' },
      });

      expect(response.statusCode).toBe(401);
      const body = JSON.parse(response.body);
      expect(body.error.code).toBe('INVALID_TOKEN');

      vi.restoreAllMocks();
    });
  });
});