import { FastifyRequest, FastifyReply } from 'fastify';
import { getTodaysFact } from './service';

export async function getTodaysFactHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fact = await getTodaysFact();

    if (!fact) {
      return reply.status(500).send({
        error: {
          code: 'FACT_UNAVAILABLE',
          message: 'Unable to retrieve today\'s food fact',
        },
      });
    }

    return reply.status(200).send({
      factDate: fact.factDate,
      title: fact.title,
      summary: fact.summary,
      wikipediaUrl: fact.wikipediaUrl,
      imageUrl: fact.imageUrl,
    });
  } catch (error) {
    request.log.error(error);
    throw error;
  }
}