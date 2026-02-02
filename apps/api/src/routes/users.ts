import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// eslint-disable-next-line @typescript-eslint/require-await -- Fastify route registration functions are async by convention, even when not using await
export async function userRoutes(fastify: FastifyInstance): Promise<void> {
  // Get all users (admin only)
  fastify.get('/', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { message: 'Get all users endpoint' };
  });

  // Get user by ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Get user ${id}` };
  });

  // Update user
  fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Update user ${id}` };
  });

  // Delete user
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Delete user ${id}` };
  });
}
