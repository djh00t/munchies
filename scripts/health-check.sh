#!/bin/bash

# Health check script for development environment
# Validates that all services are running correctly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

echo "🔍 Checking Munchies development environment health..."
echo ""

# Check Docker containers
print_status "Checking Docker containers..."
if docker-compose ps | grep -q "Up"; then
    print_success "Docker containers are running"
    docker-compose ps
else
    print_error "Docker containers are not running"
    echo "Run 'npm run docker:up' to start them"
    exit 1
fi

echo ""

# Check PostgreSQL
print_status "Checking PostgreSQL connection..."
if docker-compose exec -T postgres pg_isready -U munchies_dev -d munchies_dev >/dev/null 2>&1; then
    print_success "PostgreSQL is ready"
else
    print_error "PostgreSQL is not responding"
    exit 1
fi

# Check Redis
print_status "Checking Redis connection..."
if docker-compose exec -T redis redis-cli ping | grep -q "PONG"; then
    print_success "Redis is ready"
else
    print_error "Redis is not responding"
    exit 1
fi

# Check Backend API
print_status "Checking Backend API..."
if curl -s http://localhost:3001/api/health >/dev/null 2>&1; then
    API_RESPONSE=$(curl -s http://localhost:3001/api/health)
    if echo "$API_RESPONSE" | grep -q '"status":"ok"'; then
        print_success "Backend API is healthy"
    else
        print_warning "Backend API responded but may have issues"
        echo "Response: $API_RESPONSE"
    fi
else
    print_error "Backend API is not responding"
    echo "Check if the backend container is running and healthy"
fi

# Check Database connection from backend
print_status "Checking Backend -> Database connection..."
DB_CHECK=$(curl -s http://localhost:3001/api/health/db 2>/dev/null || echo "failed")
if echo "$DB_CHECK" | grep -q '"database":"connected"'; then
    print_success "Backend can connect to database"
else
    print_warning "Backend may have database connection issues"
fi

# Check Redis connection from backend
print_status "Checking Backend -> Redis connection..."
REDIS_CHECK=$(curl -s http://localhost:3001/api/health/redis 2>/dev/null || echo "failed")
if echo "$REDIS_CHECK" | grep -q '"redis":"connected"'; then
    print_success "Backend can connect to Redis"
else
    print_warning "Backend may have Redis connection issues"
fi

echo ""
print_status "Development tools:"
echo "  • Adminer (DB Admin): http://localhost:8080"
echo "  • Redis Commander: http://localhost:8081"
echo "  • Backend API: http://localhost:3001"
echo "  • API Health: http://localhost:3001/api/health"

echo ""
print_success "Environment health check complete! 🎉"
