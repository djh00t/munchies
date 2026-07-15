#!/bin/bash

# Dev Container Setup Script
# This runs after the dev container is created

set -e

echo "🚀 Setting up Munchies dev container environment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Install dependencies
print_status "Installing dependencies..."
npm install

# Create environment files if they don't exist
print_status "Setting up environment files..."
if [ ! -f .env ]; then
    cp .env.example .env
    print_success "Created .env from .env.example"
fi

if [ ! -f packages/backend/.env ]; then
    cp packages/backend/.env.example packages/backend/.env
    print_success "Created backend .env from .env.example"
fi

# Create necessary directories
print_status "Creating directories..."
mkdir -p uploads
mkdir -p packages/backend/logs

# Wait for database to be ready
print_status "Waiting for database to be ready..."
max_attempts=30
attempt=1
while [ $attempt -le $max_attempts ]; do
    if timeout 5 bash -c 'cat < /dev/null > /dev/tcp/postgres/5432' 2>/dev/null; then
        print_success "Database port is accessible!"
        break
    fi
    echo "Waiting for database... (attempt $attempt/$max_attempts)"
    sleep 2
    attempt=$((attempt + 1))
done

if [ $attempt -gt $max_attempts ]; then
    print_warning "Database connection test timed out, but continuing setup..."
fi

# Generate Prisma client
print_status "Generating Prisma client..."
cd packages/backend && npx prisma generate && cd ../..

print_success "Dev container setup complete! 🎉"
    # Test basic connection (will fail if not connected, but that's expected in CI)
    PGPASSWORD=munchies123 psql -h postgres -U munchies -d munchies -c "SELECT 1;" 2>/dev/null || echo "Database not yet available (normal during setup)"
else
    echo "PostgreSQL client not found"
fi

# Test Redis connection
echo "🔴 Testing Redis connection..."
if command -v redis-cli &> /dev/null; then
    echo "Redis client available"
    redis-cli -h redis ping 2>/dev/null || echo "Redis not yet available (normal during setup)"
else
    echo "Redis client not found"
fi

# Test Docker
echo "🐳 Testing Docker..."
if command -v docker &> /dev/null; then
    docker --version
else
    echo "Docker not available"
fi

# Test Git
echo "📂 Testing Git..."
git --version
git config user.name || echo "Git user not configured (normal)"

# Test project structure
echo "📁 Testing project structure..."
if [ -f "package.json" ]; then
    echo "✅ Root package.json found"
else
    echo "❌ Root package.json not found"
fi

if [ -f "packages/backend/package.json" ]; then
    echo "✅ Backend package.json found"
else
    echo "❌ Backend package.json not found"
fi

if [ -f "packages/web/package.json" ]; then
    echo "✅ Web package.json found"
else
    echo "❌ Web package.json not found"
fi

# Test dependencies
echo "📦 Testing dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Root node_modules exists"
else
    echo "❌ Root node_modules not found - run 'npm install'"
fi

echo "🎉 Devcontainer test completed!"
