import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  request.log.error(error);

  // Handle validation errors
  if (error.validation) {
    return reply.status(400).send({
      error: 'Validation Error',
      message: error.message,
      code: 'VALIDATION_ERROR',
    });
  }

  // Handle JWT errors
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'No authorization token provided',
      code: 'UNAUTHORIZED',
    });
  }

  if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Token has expired',
      code: 'TOKEN_EXPIRED',
    });
  }

  if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_INVALID') {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Invalid token',
      code: 'INVALID_TOKEN',
    });
  }

  // Handle custom errors
  if (error.statusCode) {
    return reply.status(error.statusCode).send({
      error: error.name || 'Error',
      message: error.message,
      code: error.code || 'UNKNOWN_ERROR',
    });
  }

  // Default to 500 for unhandled errors
  return reply.status(500).send({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    code: 'INTERNAL_ERROR',
  });
};
