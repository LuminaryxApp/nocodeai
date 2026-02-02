import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// eslint-disable-next-line @typescript-eslint/require-await -- Fastify route registration functions are async by convention, even when not using await
export async function templateRoutes(fastify: FastifyInstance): Promise<void> {
  // Get all templates
  fastify.get('/', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { message: 'Get all templates endpoint' };
  });

  // Get template by ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Get template ${id}` };
  });

  // Clone template
  fastify.post('/:id/clone', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Clone template ${id}` };
  });

  // Get template categories
  fastify.get('/categories', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { message: 'Get template categories endpoint' };
  });

  // Get featured templates
  fastify.get('/featured', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { message: 'Get featured templates endpoint' };
  });
}
