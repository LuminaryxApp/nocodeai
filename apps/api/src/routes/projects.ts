import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function projectRoutes(fastify: FastifyInstance) {
  // Get all projects
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Get all projects endpoint' };
  });

  // Create project
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Create project endpoint' };
  });

  // Get project by ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Get project ${id}` };
  });

  // Update project
  fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Update project ${id}` };
  });

  // Delete project
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Delete project ${id}` };
  });

  // Duplicate project
  fastify.post('/:id/duplicate', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Duplicate project ${id}` };
  });

  // Export project
  fastify.post('/:id/export', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Export project ${id}` };
  });

  // Import project
  fastify.post('/:id/import', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    return { message: `Import project ${id}` };
  });
}
