import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// eslint-disable-next-line @typescript-eslint/require-await -- Fastify route registration functions are async by convention, even when not using await
export async function orgRoutes(fastify: FastifyInstance): Promise<void> {
  // Get all organizations
  fastify.get('/', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { message: 'Get all organizations endpoint' };
  });

  // Create organization
  fastify.post('/', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { message: 'Create organization endpoint' };
  });

  // Get organization by ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Get organization ${id}` };
  });

  // Update organization
  fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Update organization ${id}` };
  });

  // Delete organization
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Delete organization ${id}` };
  });

  // Get organization members
  fastify.get('/:id/members', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Get members of organization ${id}` };
  });

  // Add member to organization
  fastify.post('/:id/members', async (request: FastifyRequest<{ Params: { id: string } }>, _reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Add member to organization ${id}` };
  });

  // Remove member from organization
  fastify.delete('/:id/members/:userId', async (request: FastifyRequest<{ Params: { id: string; userId: string } }>, _reply: FastifyReply) => {
    const { id, userId } = request.params;
    return { message: `Remove member ${userId} from organization ${id}` };
  });
}
