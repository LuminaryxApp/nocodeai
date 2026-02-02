import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import { orgRoutes } from './routes/organizations';
import { projectRoutes } from './routes/projects';
import { workflowRoutes } from './routes/workflows';
import { templateRoutes } from './routes/templates';
import { errorHandler } from './middleware/error-handler';

config();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- PrismaClient types resolve after generation
const prisma = new PrismaClient();

const fastify: FastifyInstance = Fastify({
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
void fastify.register(cors, {
  origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  credentials: true,
});

void fastify.register(jwt, {
  secret: process.env.JWT_SECRET ?? 'super-secret-key',
  sign: {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },
});

// Swagger documentation
void fastify.register(swagger, {
  swagger: {
    info: {
      title: 'NoCode AI Builder API',
      description: 'API for NoCode AI Builder platform',
      version: '1.0.0',
    },
    host: `localhost:${String(process.env.PORT ?? 3001)}`,
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

void fastify.register(swaggerUi, {
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
// eslint-disable-next-line @typescript-eslint/require-await -- Fastify route handlers are async by convention
fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

// Register routes
void fastify.register(authRoutes, { prefix: '/api/v1/auth' });
void fastify.register(userRoutes, { prefix: '/api/v1/users' });
void fastify.register(orgRoutes, { prefix: '/api/v1/organizations' });
void fastify.register(projectRoutes, { prefix: '/api/v1/projects' });
void fastify.register(workflowRoutes, { prefix: '/api/v1/workflows' });
void fastify.register(templateRoutes, { prefix: '/api/v1/templates' });

// Start server
const start = async (): Promise<void> => {
  try {
    const port = parseInt(process.env.PORT ?? '3001', 10);
    await fastify.listen({ port, host: '0.0.0.0' });
    fastify.log.info(`Server listening on port ${String(port)}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', () => {
  void (async (): Promise<void> => {
    await fastify.close();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- PrismaClient $disconnect
    await prisma.$disconnect();
    process.exit(0);
  })();
});

process.on('SIGTERM', () => {
  void (async (): Promise<void> => {
    await fastify.close();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- PrismaClient $disconnect
    await prisma.$disconnect();
    process.exit(0);
  })();
});

void start();
