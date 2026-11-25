import Fastify, { FastifyError } from 'fastify';
import { env } from './config/environment';
import { authPlugin } from './plugins/auth';

// Create Fastify instance
const app = Fastify({
  logger: {
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    redact: ['req.headers.authorization', 'req.cookies.bhukos_session'],
  },
});

// Register CORS plugin for cookie-based auth
app.register(import('@fastify/cors'), {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Register plugins
app.register(authPlugin);

// Register health route (public, no auth required) - at /health
import { healthRoute } from './routes/v1/health.route';
app.register(healthRoute);

// Register auth routes
import { authRoutes } from './modules/auth/routes';
app.register(authRoutes);

// Register facts routes
import { factsRoutes } from './modules/facts/routes';
app.register(factsRoutes);

// Register cards routes
import { cardsRoutes } from './modules/cards/routes';
app.register(cardsRoutes);

// Centralized error handler
app.setErrorHandler<FastifyError>((error, request, reply) => {
  // Log the error (but not sensitive data in production)
  request.log.error(error);

  // Don't expose internal errors in production
  if (env.NODE_ENV === 'production' && error.message === 'Internal Server Error') {
    return reply.status(500).send({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    });
  }

  // Validation errors
  if ((error as any).validation) {
    return reply.status(400).send({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: (error as any).validation,
      },
    });
  }

  // Default error response
  const statusCode = error.statusCode ?? 500;
  const code = (error as any).code ?? 'INTERNAL_ERROR';

  return reply.status(statusCode).send({
    error: {
      code,
      message: error.message,
      ...((error as any).details && { details: (error as any).details }),
    },
  });
});

export { app };