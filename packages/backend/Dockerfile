FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/

# Install dependencies
RUN npm ci --only=production

# Development image
FROM base AS dev
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY packages/backend/ ./packages/backend/

# Create uploads directory
RUN mkdir -p packages/backend/uploads

# Expose port
EXPOSE 3001

# Start the development server
CMD ["npm", "run", "dev", "--workspace=packages/backend"]

# Production image
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built application
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=deps --chown=nodejs:nodejs /app/packages ./packages

# Create necessary directories
RUN mkdir -p uploads logs && chown nodejs:nodejs uploads logs

USER nodejs

EXPOSE 3001

CMD ["npm", "start", "--workspace=packages/backend"]
