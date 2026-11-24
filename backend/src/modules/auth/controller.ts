import { FastifyRequest, FastifyReply } from 'fastify';
import { GoogleAuthBodySchema } from './schema';
import { verifyGoogleToken, upsertUser } from './service';

export async function googleAuthHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = GoogleAuthBodySchema.parse({
      idToken: (request.body as any).idToken,
    });

    const googleUser = await verifyGoogleToken(body.idToken);
    const authPayload = await upsertUser(googleUser);

    const token = await request.server.jwtSign(authPayload);

    reply.setCookie('bhukos_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return reply.status(200).send({ user: authPayload });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid Google token payload') {
      return reply.status(401).send({
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid Google ID token',
        },
      });
    }
    throw error;
  }
}

export async function getMeHandler(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user;

  if (!user) {
    return reply.status(401).send({ error: { code: 'UNAUTHENTICATED', message: 'Please sign in to continue' } });
  }

  return reply.status(200).send({ user });
}

export async function logoutHandler(request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie('bhukos_session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return reply.status(204).send();
}