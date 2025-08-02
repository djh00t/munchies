#!/bin/bash

# Development Environment Setup Script for Munchies (Dev Container)
set -e

echo "🍕 Setting up Munchies development environment in dev container..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v) ✓"

# Install local database services for dev container
print_status "Setting up local development services..."

# Install PostgreSQL and Redis for local development
if ! command -v psql &> /dev/null; then
    print_status "Installing PostgreSQL..."
    sudo apt-get update -qq
    sudo apt-get install -y postgresql postgresql-contrib
    print_success "PostgreSQL installed"
fi

if ! command -v redis-cli &> /dev/null; then
    print_status "Installing Redis..."
    sudo apt-get install -y redis-server
    print_success "Redis installed"
fi

echo "✅ Docker and Node.js are installed"

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p uploads
mkdir -p packages/backend/uploads

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your API keys and configuration"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd packages/backend
npm install
cd ../..

echo "🐳 Starting Docker services..."
docker-compose up -d postgres redis

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are healthy
echo "🔍 Checking service health..."
if docker-compose ps | grep -q "Up (healthy)"; then
    echo "✅ Services are healthy"
else
    echo "⚠️  Services may still be starting up. Check with: docker-compose ps"
fi

echo "🎉 Development environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your API keys"
echo "2. Run: npm run dev (to start backend and web)"
echo "3. Run: docker-compose logs -f (to view logs)"
echo "4. Backend API: http://localhost:3001"
echo "5. Web app: http://localhost:3000 (when created)"
echo ""
echo "Useful commands:"
echo "- Stop services: docker-compose down"
echo "- View logs: docker-compose logs -f"
echo "- Reset database: ./scripts/reset-db.sh"
