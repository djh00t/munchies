#!/bin/bash

# Start development services
set -e

echo "🚀 Starting Munchies development services..."

# Start Docker services
echo "🐳 Starting Docker containers..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 5

# Check service status
echo "🔍 Checking service status..."
docker-compose ps

echo "✅ Services started!"
echo ""
echo "Available services:"
echo "- Backend API: http://localhost:3001"
echo "- PostgreSQL: localhost:5432"
echo "- Redis: localhost:6379"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop services: ./scripts/stop-dev.sh"
