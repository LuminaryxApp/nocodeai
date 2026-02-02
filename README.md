# NoCode AI Builder

Empower your ideas without writing a line of code.

## Overview

NoCode AI Builder is a visual workflow builder that enables users to create AI-driven applications through a drag-and-drop interface. Build custom workflows, integrate AI/ML models, and automate tasks without any coding experience.

## Features

- 🎨 **Visual Workflow Builder** - Drag-and-drop interface for building workflows
- 🤖 **AI Model Integration** - Connect to OpenAI, Anthropic, and other AI providers
- 📚 **Template Library** - Start quickly with pre-built templates
- 🚀 **Instant Deployment** - Deploy workflows as API endpoints
- 🔐 **Secure & Scalable** - Enterprise-grade security and scalability

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- shadcn/ui for components
- Tailwind CSS for styling
- React Flow for visual workflow canvas
- Zustand for state management
- TanStack Query for data fetching

### Backend
- Node.js with Fastify
- TypeScript
- Prisma ORM
- PostgreSQL database
- Redis for caching
- JWT authentication

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Docker and Docker Compose (optional, for local development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LuminaryxApp/nocodeai.git
cd nocodeai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Development

#### Option 1: Using Docker (Recommended)

Start all services with Docker Compose:
```bash
docker-compose up
```

This will start:
- Frontend at http://localhost:3000
- API at http://localhost:3001
- PostgreSQL at localhost:5432
- Redis at localhost:6379

#### Option 2: Manual Setup

1. Start PostgreSQL and Redis (you can use Docker for just the services):
```bash
docker-compose up postgres redis
```

2. Set up the database:
```bash
cd apps/api
npx prisma migrate dev
```

3. Start the API:
```bash
cd apps/api
npm run dev
```

4. Start the frontend (in a new terminal):
```bash
cd apps/web
npm run dev
```

## Project Structure

```
nocode-ai-builder/
├── apps/
│   ├── api/           # Fastify backend
│   └── web/           # React frontend
├── packages/
│   ├── shared/        # Shared types and utilities
│   ├── eslint-config/ # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── docker-compose.yml
├── package.json
└── turbo.json         # Turborepo configuration
```

## Scripts

```bash
# Development
npm run dev              # Start all apps in development mode

# Building
npm run build            # Build all apps

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio

# Linting and formatting
npm run lint             # Lint all apps
npm run format           # Format code with Prettier
npm run typecheck        # Type check all apps
```

## API Documentation

API documentation is available at http://localhost:3001/documentation when running the API server.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

[MIT](./LICENSE)

## Support

For support, please open an issue on GitHub or contact us at support@nocodeai.builder
