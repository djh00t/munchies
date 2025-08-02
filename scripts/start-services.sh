#!/bin/bash

# Dev Container Services Setup Script
# Starts PostgreSQL and Redis services locally in the dev container

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status "Starting local development services..."

# Start PostgreSQL
print_status "Starting PostgreSQL..."
if ! sudo service postgresql status >/dev/null 2>&1; then
    sudo service postgresql start
    sleep 2
fi

if sudo service postgresql status >/dev/null 2>&1; then
    print_success "PostgreSQL is running"
else
    print_error "Failed to start PostgreSQL"
    exit 1
fi

# Start Redis
print_status "Starting Redis..."
if ! sudo service redis-server status >/dev/null 2>&1; then
    sudo service redis-server start
    sleep 2
fi

if sudo service redis-server status >/dev/null 2>&1; then
    print_success "Redis is running"
else
    print_error "Failed to start Redis"
    exit 1
fi

# Setup PostgreSQL database and user
print_status "Setting up PostgreSQL database..."
sudo -u postgres psql -c "CREATE USER munchies WITH PASSWORD 'munchies123';" 2>/dev/null || true
sudo -u postgres psql -c "CREATE DATABASE munchies_dev OWNER munchies;" 2>/dev/null || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE munchies_dev TO munchies;" 2>/dev/null || true

print_success "Database setup complete"

print_status "Testing connections..."

# Test PostgreSQL connection
if PGPASSWORD=munchies123 psql -h localhost -U munchies -d munchies_dev -c "SELECT 1;" >/dev/null 2>&1; then
    print_success "PostgreSQL connection successful"
else
    print_error "PostgreSQL connection failed"
    exit 1
fi

# Test Redis connection
if redis-cli ping >/dev/null 2>&1; then
    print_success "Redis connection successful"
else
    print_error "Redis connection failed"
    exit 1
fi

print_success "All services are running and accessible! 🎉"
echo ""
echo "📋 Service Status:"
echo "  • PostgreSQL: localhost:5432 (database: munchies_dev, user: munchies)"
echo "  • Redis: localhost:6379"
echo ""
echo "🔧 Next steps:"
echo "  • Run 'npm install' to install dependencies"
echo "  • Run 'npm run db:migrate' to set up database schema"
echo "  • Run 'npm run db:seed' to add sample data"
echo "  • Run 'npm run dev:backend' to start the API server"
