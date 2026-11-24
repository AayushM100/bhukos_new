import fp from 'fastify-plugin';
import fastifyjwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { env } from '../config/environment';
import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

export interface AuthPayload {
  id: string;
  email: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: AuthPayload;
  }

  interface Fastifyjwt {
    jwtSign: (payload: AuthPayload, options?: any) => Promise<string>;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: AuthPayload;
  }

  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireAuth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    jwtSign: (payload: AuthPayload, options?: any) => Promise<string>;
  }
}

export const authPlugin = fp(async (fastify: FastifyInstance) => {
  await fastify.register(fastifyCookie);

  await fastify.register(fastifyjwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'bhukos_session',
      signed: false,
    },
    formatUser: (payload) => payload as AuthPayload,
  });

  // Verify JWT from cookie and populate request.user
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.cookies.bhukos_session;
      if (!token) {
        return reply.status(401).send({ error: { code: 'UNAUTHENTICATED', message: 'Please sign in to continue' } });
      }
      request.user = await request.jwtVerify<AuthPayload>();
    } catch (err) {
      return reply.status(401).send({ error: { code: 'UNAUTHENTICATED', message: 'Invalid or expired session' } });
    }
  });

  // PreHandler for routes that require authentication
  fastify.decorate('requireAuth', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.cookies.bhukos_session;
      if (!token) {
        return reply.status(401).send({ error: { code: 'UNAUTHENTICATED', message: 'Please sign in to continue' } });
      }
      request.user = await request.jwtVerify<AuthPayload>();
    } catch (err) {
      return reply.status(401).send({ error: { code: 'UNAUTHENTICATED', message: 'Invalid or expired session' } });
    }
  });
});