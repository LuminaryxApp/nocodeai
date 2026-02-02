import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import { orgRoutes } from './routes/organizations';
import { projectRoutes } from './routes/projects';
import { workflowRoutes } from './routes/workflows';
import { templateRoutes } from './routes/templates';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const prisma = new PrismaClient();

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register plugins
fastify.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'super-secret-key',
  sign: {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
});

// Swagger documentation
fastify.register(swagger, {
  swagger: {
    info: {
      title: 'NoCode AI Builder API',
      description: 'API for NoCode AI Builder platform',
      version: '1.0.0',
    },
    host: `localhost:${process.env.PORT || 3001}`,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
});

fastify.register(swaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
});

// Decorate fastify with prisma
fastify.decorate('prisma', prisma);

// Error handler
fastify.setErrorHandler(errorHandler);

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Register routes
fastify.register(authRoutes, { prefix: '/api/v1/auth' });
fastify.register(userRoutes, { prefix: '/api/v1/users' });
fastify.register(orgRoutes, { prefix: '/api/v1/organizations' });
fastify.register(projectRoutes, { prefix: '/api/v1/projects' });
fastify.register(workflowRoutes, { prefix: '/api/v1/workflows' });
fastify.register(templateRoutes, { prefix: '/api/v1/templates' });

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001', 10);
    await fastify.listen({ port, host: '0.0.0.0' });
    fastify.log.info(`Server listening on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await fastify.close();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await fastify.close();
  await prisma.$disconnect();
  process.exit(0);
});

start();
