import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { workflowEngine } from '../services/workflow-engine';

const prisma = new PrismaClient();

interface CreateWorkflowBody {
  projectId: string;
  name: string;
  description?: string;
  nodes: any[];
  edges: any[];
  config?: Record<string, any>;
}

interface UpdateWorkflowBody {
  name?: string;
  description?: string;
  nodes?: any[];
  edges?: any[];
  config?: Record<string, any>;
  isActive?: boolean;
}

interface ExecuteWorkflowBody {
  inputs?: Record<string, any>;
}

// eslint-disable-next-line @typescript-eslint/require-await -- Fastify route registration functions are async by convention, even when not using await
export async function workflowRoutes(fastify: FastifyInstance): Promise<void> {
  // Get all workflows
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userId = (request as any).user?.id;
      
      const workflows = await prisma.workflow.findMany({
        where: {
          OR: [
            { createdBy: userId },
            { project: { createdBy: userId } }
          ]
        },
        include: {
          project: {
            select: {
              id: true,
              name: true
            }
          },
          _count: {
            select: {
              executions: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });

      return workflows;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch workflows' });
    }
  });

  // Create workflow
  fastify.post('/', async (request: FastifyRequest<{ Body: CreateWorkflowBody }>, reply: FastifyReply) => {
    try {
      const userId = (request as any).user?.id;
      const { projectId, name, description, nodes, edges, config } = request.body;

      const workflow = await prisma.workflow.create({
        data: {
          projectId,
          name,
          description,
          nodes,
          edges,
          config: config || {},
          createdBy: userId
        }
      });

      return reply.status(201).send(workflow);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to create workflow' });
    }
  });

  // Get workflow by ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      const workflow = await prisma.workflow.findUnique({
        where: { id },
        include: {
          project: {
            select: {
              id: true,
              name: true
            }
          },
          executions: {
            orderBy: { startedAt: 'desc' },
            take: 5
          }
        }
      });

      if (!workflow) {
        return reply.status(404).send({ error: 'Workflow not found' });
      }

      return workflow;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch workflow' });
    }
  });

  // Update workflow
  fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: UpdateWorkflowBody }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const updates = request.body;

      const workflow = await prisma.workflow.update({
        where: { id },
        data: {
          ...updates,
          version: { increment: 1 }
        }
      });

      return workflow;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to update workflow' });
    }
  });

  // Delete workflow
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      await prisma.workflow.delete({
        where: { id }
      });

      return reply.status(204).send();
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to delete workflow' });
    }
  });

  // Execute workflow
  fastify.post('/:id/execute', async (request: FastifyRequest<{ Params: { id: string }; Body: ExecuteWorkflowBody }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const { inputs } = request.body || {};
      const userId = (request as any).user?.id;

      const result = await workflowEngine.executeWorkflow(id, inputs || {}, userId);

      return result;
    } catch (error: any) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Workflow execution failed',
        message: error.message 
      });
    }
  });

  // Get workflow execution status
  fastify.get('/executions/:executionId', async (request: FastifyRequest<{ Params: { executionId: string } }>, reply: FastifyReply) => {
    try {
      const { executionId } = request.params;

      const execution = await workflowEngine.getExecutionStatus(executionId);

      if (!execution) {
        return reply.status(404).send({ error: 'Execution not found' });
      }

      return execution;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch execution' });
    }
  });

  // Get workflow executions
  fastify.get('/:id/executions', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      const executions = await workflowEngine.getWorkflowExecutions(id, 20);

      return executions;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch executions' });
    }
  });

  // Validate workflow
  fastify.post('/:id/validate', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      const workflow = await prisma.workflow.findUnique({
        where: { id }
      });

      if (!workflow) {
        return reply.status(404).send({ error: 'Workflow not found' });
      }

      const nodes = workflow.nodes as any[];
      const edges = workflow.edges as any[];
      const errors: string[] = [];
      const warnings: string[] = [];

      // Check for trigger node
      const hasTrigger = nodes.some(n => n.type === 'trigger');
      if (!hasTrigger) {
        errors.push('Workflow must have at least one trigger node');
      }

      // Check for disconnected nodes
      const connectedNodeIds = new Set<string>();
      edges.forEach(edge => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);
      });

      nodes.forEach(node => {
        if (!connectedNodeIds.has(node.id) && node.type !== 'trigger') {
          warnings.push(`Node "${node.data.label}" is not connected`);
        }
      });

      return {
        valid: errors.length === 0,
        errors,
        warnings
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to validate workflow' });
    }
  });

  // Publish workflow
  fastify.post('/:id/publish', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      const workflow = await prisma.workflow.update({
        where: { id },
        data: {
          isActive: true
        }
      });

      return workflow;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to publish workflow' });
    }
  });
}
