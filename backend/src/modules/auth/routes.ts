import { FastifyInstance } from 'fastify';
import { googleAuthHandler, getMeHandler, logoutHandler } from './controller';

export async function authRoutes(fastify: FastifyInstance) {
  // Public route - verify Google token and set session
  fastify.post('/api/v1/auth/google', googleAuthHandler);

  // Get current user - requires authentication, returns 401 if not logged in
  // Uses authenticate as a preHandler to verify JWT from cookie
  fastify.get('/api/v1/auth/me', {
    preHandler: fastify.authenticate,
  }, getMeHandler);

  // Auth required - logout
  fastify.post('/api/v1/auth/logout', {
    preHandler: fastify.authenticate,
  }, logoutHandler);
}