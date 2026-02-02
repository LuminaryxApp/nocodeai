import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function userRoutes(fastify: FastifyInstance) {
  // Get all users (admin only)
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Get all users endpoint' };
  });

  // Get user by ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Get user ${id}` };
  });

  // Update user
  fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Update user ${id}` };
  });

  // Delete user
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Delete user ${id}` };
  });
}
