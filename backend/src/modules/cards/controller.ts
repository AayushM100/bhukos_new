import { FastifyRequest, FastifyReply } from 'fastify';
import { CardsQuerySchema, CardSlugParamsSchema } from './schema';
import { listCards, getCardBySlug } from './service';

export async function getCardsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const query = CardsQuerySchema.parse(request.query);
    const result = await listCards(query);

    return reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'Validation error') {
      return reply.status(400).send({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid query parameters',
          details: error,
        },
      });
    }
    request.log.error(error);
    throw error;
  }
}

export async function getCardBySlugHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = CardSlugParamsSchema.parse(request.params as Record<string, string>);
    const card = await getCardBySlug(params.slug);

    if (!card) {
      return reply.status(404).send({
        error: {
          code: 'CARD_NOT_FOUND',
          message: `Food card with slug "${params.slug}" not found`,
        },
      });
    }

    return reply.status(200).send(card);
  } catch (error) {
    if (error instanceof Error && error.message === 'Validation error') {
      return reply.status(400).send({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid slug parameter',
          details: error,
        },
      });
    }
    request.log.error(error);
    throw error;
  }
}