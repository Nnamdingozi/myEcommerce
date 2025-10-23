#!/bin/sh

# This script is the entrypoint for the production Docker container.
# It runs database migrations and then starts the Node.js server.

echo "Running production start script..."
set -e

# Run Prisma migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Start the application
echo "Starting the server..."
npm run start