# Munchies Development Container

This directory contains the VS Code Development Container configuration for the Munchies project. The devcontainer provides a consistent, isolated development environment with all necessary tools and dependencies pre-installed.

## 🚀 Quick Start

1. **Prerequisites**:
   - [VS Code](https://code.visualstudio.com/) installed
   - [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) installed
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/) running

2. **Open in Dev Container**:
   - Clone the repository
   - Open the project in VS Code
   - When prompted, click "Reopen in Container" or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"

3. **Wait for Setup**:
   - The container will build and install dependencies automatically
   - Database migrations and seeding will run automatically

4. **Start Development**:
   ```bash
   npm run dev
   ```

## 🛠 What's Included

### Core Tools
- **Node.js 18** - JavaScript runtime
- **npm** - Package manager
- **Git** - Version control
- **Zsh + Oh My Zsh** - Enhanced shell experience
- **Docker-in-Docker** - For container operations

### Development Tools
- **TypeScript** - Type-safe JavaScript
- **TSX** - TypeScript execution
- **Prisma** - Database toolkit
- **ESLint** - Code linting
- **Prettier** - Code formatting

### VS Code Extensions
- TypeScript language support
- ESLint and Prettier integration
- Tailwind CSS IntelliSense
- PostgreSQL tools
- Docker support
- Git extensions
- GitHub Copilot
- React/Next.js snippets

### Services
- **PostgreSQL** - Main database (port 5432)
- **Redis** - Cache and sessions (port 6379)
- **Backend API** - Express server (port 3001)
- **Frontend** - Next.js app (port 3000)

## 📁 Configuration Files

- `devcontainer.json` - Main devcontainer configuration
- `docker-compose.devcontainer.yml` - Docker Compose overrides for development
- `Dockerfile` - Custom development container image
- `../.vscode/` - VS Code workspace settings, tasks, and debug configurations

## 🔧 Available Commands

### VS Code Tasks (Ctrl+Shift+P → "Tasks: Run Task")
- **Install Dependencies** - `npm install`
- **Start Development (Full Stack)** - `npm run dev`
- **Start Backend Only** - `npm run dev:backend`
- **Start Frontend Only** - `npm run dev:web`
- **Build All** - `npm run build`
- **Lint All** - `npm run lint`
- **Test All** - `npm run test`
- **Database: Migrate** - `npm run db:migrate`
- **Database: Seed** - `npm run db:seed`
- **Docker: Start Services** - `npm run docker:up`
- **Docker: Stop Services** - `npm run docker:down`
- **Clean All** - `npm run clean`

### Terminal Commands
```bash
# Development
npm run dev                 # Start full stack development
npm run dev:backend        # Start backend only
npm run dev:web           # Start frontend only

# Building
npm run build             # Build all packages
npm run clean             # Clean build artifacts

# Database
npm run db:migrate        # Run database migrations
npm run db:seed          # Seed database with test data

# Docker
npm run docker:up        # Start database services
npm run docker:down      # Stop database services
npm run docker:reset     # Reset database with fresh data

# Linting & Testing
npm run lint             # Lint all packages
npm run test             # Run all tests
```

## 🐛 Debugging

### Backend Debugging
- Use the "Debug Backend (Node.js)" configuration in VS Code
- Set breakpoints in TypeScript files
- Debug console available in VS Code

### Frontend Debugging
- Use the "Debug Frontend (Chrome)" configuration
- Browser debugging tools available
- React DevTools supported

## 🗃 Database Access

### PostgreSQL Connection
- **Host**: localhost (or postgres from within containers)
- **Port**: 5432
- **Database**: munchies
- **Username**: munchies
- **Password**: munchies123

### Tools
- **VS Code SQLTools** extension provides direct database access
- **Prisma Studio**: Run `npm run db:studio` in backend directory
- **psql**: Available in terminal for command-line access

## 🔄 Port Forwarding

The devcontainer automatically forwards these ports:
- `3000` - Next.js Frontend
- `3001` - Express Backend API
- `5432` - PostgreSQL Database
- `6379` - Redis Cache

## 🏗 Customization

### Adding VS Code Extensions
Edit `devcontainer.json` and add extension IDs to the `extensions` array:
```json
"extensions": [
  "existing.extension",
  "new.extension-id"
]
```

### Environment Variables
Add or modify environment variables in `devcontainer.json`:
```json
"containerEnv": {
  "NEW_VAR": "value"
}
```

### Additional Services
Add new services to `docker-compose.devcontainer.yml` following Docker Compose syntax.

## 🚨 Troubleshooting

### Container Won't Start
1. Ensure Docker Desktop is running
2. Check Docker has sufficient memory allocated (recommended: 4GB+)
3. Try rebuilding the container: "Dev Containers: Rebuild Container"

### Port Conflicts
1. Check if ports 3000, 3001, 5432, or 6379 are in use on your host
2. Stop conflicting services or modify port mappings in docker-compose files

### Database Connection Issues
1. Ensure PostgreSQL service is healthy: `docker-compose ps`
2. Check database logs: `docker-compose logs postgres`
3. Restart services: `npm run docker:reset`

### Performance Issues
1. Increase Docker Desktop memory allocation
2. Enable file watching exclusions in VS Code settings
3. Use Docker volume mounts for node_modules (already configured)

## 📚 Learn More

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Munchies Project Documentation](../README.md)
