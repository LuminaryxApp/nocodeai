import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function templateRoutes(fastify: FastifyInstance) {
  // Get all templates
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Get all templates endpoint' };
  });

  // Get template by ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Get template ${id}` };
  });

  // Clone template
  fastify.post('/:id/clone', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Clone template ${id}` };
  });

  // Get template categories
  fastify.get('/categories', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Get template categories endpoint' };
  });

  // Get featured templates
  fastify.get('/featured', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Get featured templates endpoint' };
  });
}
