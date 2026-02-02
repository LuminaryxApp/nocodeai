#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Setup environment
echo "Setting up environment..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo ".env file created. Please update it with your configuration."
fi

# Generate Prisma client
echo "Generating Prisma client..."
cd apps/api
npx prisma generate

# Run migrations
echo "Running database migrations..."
npx prisma migrate dev --name init

cd ../..

echo "Setup complete!"
echo ""
echo "To start development:"
echo "  Option 1 (Docker): docker-compose up"
echo "  Option 2 (Manual):"
echo "    - Terminal 1: cd apps/api && npm run dev"
echo "    - Terminal 2: cd apps/web && npm run dev"
