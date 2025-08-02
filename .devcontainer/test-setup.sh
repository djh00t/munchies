#!/bin/bash

# Test script for devcontainer setup
set -e

echo "🧪 Testing Munchies devcontainer setup..."

# Test Node.js
echo "📦 Testing Node.js..."
node --version
npm --version

# Test TypeScript
echo "📝 Testing TypeScript..."
npx tsc --version

# Test database connection
echo "🗃️ Testing database connection..."
if command -v psql &> /dev/null; then
    echo "PostgreSQL client available"
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
