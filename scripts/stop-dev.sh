#!/bin/bash

# Stop development services
set -e

echo "🛑 Stopping Munchies development services..."

# Stop Docker services
docker-compose down

echo "✅ All services stopped!"
