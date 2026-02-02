import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// eslint-disable-next-line @typescript-eslint/require-await -- Fastify route registration functions are async by convention, even when not using await
export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  // Register
  fastify.post('/register', async (request: FastifyRequest, _reply: FastifyReply) => {
    const { _email, _password, _name } = request.body as { _email: string; _password: string; _name?: string };

    // TODO: Implement registration logic
    return { message: 'Registration endpoint' };
  });

  // Login
  fastify.post('/login', async (request: FastifyRequest, _reply: FastifyReply) => {
    const { _email, _password } = request.body as { _email: string; _password: string };

    // TODO: Implement login logic
    return { message: 'Login endpoint' };
  });

  // Logout
  fastify.post('/logout', async (_request: FastifyRequest, _reply: FastifyReply) => {
    // TODO: Implement logout logic
    return { message: 'Logged out successfully' };
  });

  // Refresh token
  fastify.post('/refresh', async (_request: FastifyRequest, _reply: FastifyReply) => {
    // TODO: Implement token refresh logic
    return { message: 'Refresh endpoint' };
  });

  // Forgot password
  fastify.post('/forgot-password', async (request: FastifyRequest, _reply: FastifyReply) => {
    const { _email } = request.body as { _email: string };

    // TODO: Implement forgot password logic
    return { message: 'Password reset email sent' };
  });

  // Reset password
  fastify.post('/reset-password', async (request: FastifyRequest, _reply: FastifyReply) => {
    const { _token, _password } = request.body as { _token: string; _password: string };

    // TODO: Implement reset password logic
    return { message: 'Password reset successful' };
  });

  // Get current user
  fastify.get('/me', async (_request: FastifyRequest, _reply: FastifyReply) => {
    // TODO: Implement get current user logic
    return { message: 'Get current user endpoint' };
  });
}
