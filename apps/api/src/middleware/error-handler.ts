import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const errorHandler = (
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
): void => {
  _request.log.error(error);

  // Handle validation errors
  if (error.validation) {
    void reply.status(400).send({
      error: 'Validation Error',
      message: error.message,
      code: 'VALIDATION_ERROR',
    });
    return;
  }

  // Handle JWT errors
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
    void reply.status(401).send({
      error: 'Unauthorized',
      message: 'No authorization token provided',
      code: 'UNAUTHORIZED',
    });
    return;
  }

  if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
    void reply.status(401).send({
      error: 'Unauthorized',
      message: 'Token has expired',
      code: 'TOKEN_EXPIRED',
    });
    return;
  }

  if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_INVALID') {
    void reply.status(401).send({
      error: 'Unauthorized',
      message: 'Invalid token',
      code: 'INVALID_TOKEN',
    });
    return;
  }

  // Handle custom errors
  if (error.statusCode) {
    void reply.status(error.statusCode).send({
      error: error.name || 'Error',
      message: error.message,
      code: error.code || 'UNKNOWN_ERROR',
    });
    return;
  }

  // Default to 500 for unhandled errors
  void reply.status(500).send({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    code: 'INTERNAL_ERROR',
  });
};
