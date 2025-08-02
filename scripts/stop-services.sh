#!/bin/bash

# Stop local development services in dev container

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

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_status "Stopping local development services..."

# Stop Redis
if sudo service redis-server status >/dev/null 2>&1; then
    print_status "Stopping Redis..."
    sudo service redis-server stop
    print_success "Redis stopped"
else
    print_warning "Redis was not running"
fi

# Stop PostgreSQL
if sudo service postgresql status >/dev/null 2>&1; then
    print_status "Stopping PostgreSQL..."
    sudo service postgresql stop
    print_success "PostgreSQL stopped"
else
    print_warning "PostgreSQL was not running"
fi

print_success "All services stopped! 🛑"
