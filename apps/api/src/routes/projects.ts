import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateProjectBody {
  orgId: string;
  name: string;
  description?: string;
}

interface UpdateProjectBody {
  name?: string;
  description?: string;
  workflowData?: Record<string, any>;
  status?: string;
  isArchived?: boolean;
}

// eslint-disable-next-line @typescript-eslint/require-await -- Fastify route registration functions are async by convention, even when not using await
export async function projectRoutes(fastify: FastifyInstance): Promise<void> {
  // Get all projects
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userId = (request as any).user?.id;
      
      const projects = await prisma.project.findMany({
        where: {
          OR: [
            { createdBy: userId },
            { org: { members: { some: { userId } } } }
          ],
          isArchived: false
        },
        include: {
          _count: {
            select: {
              workflows: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });

      return projects;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch projects' });
    }
  });

  // Create project
  fastify.post('/', async (request: FastifyRequest<{ Body: CreateProjectBody }>, reply: FastifyReply) => {
    try {
      const userId = (request as any).user?.id;
      const { orgId, name, description } = request.body;

      const project = await prisma.project.create({
        data: {
          orgId,
          name,
          description,
          createdBy: userId
        }
      });

      return reply.status(201).send(project);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to create project' });
    }
  });

  // Get project by ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          workflows: {
            orderBy: { updatedAt: 'desc' }
          },
          org: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      if (!project) {
        return reply.status(404).send({ error: 'Project not found' });
      }

      return project;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch project' });
    }
  });

  // Update project
  fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: UpdateProjectBody }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const updates = request.body;

      const project = await prisma.project.update({
        where: { id },
        data: updates
      });

      return project;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to update project' });
    }
  });

  // Delete project
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      await prisma.project.delete({
        where: { id }
      });

      return reply.status(204).send();
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to delete project' });
    }
  });

  // Duplicate project
  fastify.post('/:id/duplicate', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const userId = (request as any).user?.id;

      const original = await prisma.project.findUnique({
        where: { id }
      });

      if (!original) {
        return reply.status(404).send({ error: 'Project not found' });
      }

      const duplicate = await prisma.project.create({
        data: {
          orgId: original.orgId,
          name: `${original.name} (Copy)`,
          description: original.description,
          workflowData: original.workflowData,
          createdBy: userId
        }
      });

      return reply.status(201).send(duplicate);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to duplicate project' });
    }
  });

  // Export project
  fastify.get('/:id/export', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          workflows: true
        }
      });

      if (!project) {
        return reply.status(404).send({ error: 'Project not found' });
      }

      const exportData = {
        name: project.name,
        description: project.description,
        workflowData: project.workflowData,
        workflows: project.workflows,
        exportedAt: new Date().toISOString()
      };

      reply.header('Content-Type', 'application/json');
      reply.header('Content-Disposition', `attachment; filename="${project.name}-export.json"`);
      return exportData;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to export project' });
    }
  });
}
