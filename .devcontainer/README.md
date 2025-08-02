# Munchies Dev Container

This development environment uses VS Code Dev Containers with Docker Compose to provide a complete, isolated development setup with all required services.

## What's Included

### Services
- **Development Container**: Ubuntu with Node.js 18, Zsh, and development tools
- **PostgreSQL**: Database server with health checks
- **Redis**: Cache and session storage
- **Adminer**: Web-based database administration (port 8080)
- **Redis Commander**: Web-based Redis administration (port 8081)

### Pre-installed Tools
- Node.js 18 with npm
- Git with configuration
- Zsh with Oh My Zsh
- VS Code extensions for TypeScript, ESLint, Prettier
- PostgreSQL client tools
- Redis CLI tools

## Quick Start

### Option 1: VS Code Dev Containers Extension
1. Install the "Dev Containers" extension in VS Code
2. Open the project folder
3. Click "Reopen in Container" when prompted
4. Wait for the container to build and setup to complete

### Option 2: Command Palette
1. Open VS Code in the project folder
2. Press `Cmd/Ctrl + Shift + P`
3. Type "Dev Containers: Reopen in Container"
4. Select the command and wait for setup

## What Happens During Setup

The dev container automatically:
1. **Builds** the development container with all tools
2. **Starts** PostgreSQL and Redis services
3. **Installs** npm dependencies
4. **Creates** environment files from examples
5. **Generates** Prisma client
6. **Sets up** directory structure

## After Setup

Once the container is running, you can:

### Start Development
```bash
# Run database migrations
npm run db:migrate

# Seed the database with test data
npm run db:seed

# Start the backend API server
npm run dev:backend

# Or start both frontend and backend
npm run dev
```

### Access Services
- **Backend API**: http://localhost:3001
- **Database Admin**: http://localhost:8080
- **Redis Admin**: http://localhost:8081
- **API Health Check**: http://localhost:3001/api/health

### Useful Commands
```bash
# Database operations
npm run db:migrate      # Run migrations
npm run db:seed         # Seed test data
npm run db:studio       # Open Prisma Studio

# Development
npm run dev:backend     # Start backend only
npm run test            # Run tests
npm run lint            # Lint code

# View logs
docker-compose logs postgres
docker-compose logs redis
```

## Environment Variables

The setup automatically creates:
- `.env` (root level configuration)
- `packages/backend/.env` (backend-specific configuration)

Both files are created from their `.example` counterparts with sensible defaults for the dev container environment.

## Database Connection

The backend connects to PostgreSQL using:
```
DATABASE_URL=postgresql://munchies:munchies123@postgres:5432/munchies_dev
```

The database is accessible from:
- **Inside containers**: `postgres:5432`
- **From host**: `localhost:5432` (if ports are forwarded)

## Redis Connection

Redis is accessible at:
```
REDIS_URL=redis://redis:6379
```

## Troubleshooting

### Container Won't Start
1. Check Docker is running
2. Try rebuilding: `Cmd/Ctrl + Shift + P` → "Dev Containers: Rebuild Container"
3. Check Docker Compose logs: `docker-compose logs`

### Database Connection Issues
1. Wait for services to fully start (can take 30-60 seconds)
2. Check service health: `docker-compose ps`
3. Test connection: `docker-compose exec postgres pg_isready -U munchies`

### Port Conflicts
If ports 3001, 5432, 6379, 8080, or 8081 are in use:
1. Stop conflicting services
2. Or modify ports in `.devcontainer/docker-compose.devcontainer.yml`

### Performance Issues
1. Ensure Docker has adequate resources (4GB+ RAM)
2. Consider using Docker Desktop with WSL 2 on Windows
3. Close unnecessary applications

## Development Workflow

### Making Changes
1. Edit code in VS Code as normal
2. Changes are automatically synced to the container
3. Use hot reloading for rapid development
4. Run tests in the integrated terminal

### Database Changes
1. Modify `packages/backend/prisma/schema.prisma`
2. Run `npm run db:migrate` to apply changes
3. Update seed data if needed

### Adding Dependencies
```bash
# Add to root workspace
npm install <package>

# Add to backend
npm install <package> --workspace=packages/backend

# Add to frontend
npm install <package> --workspace=packages/web
```

## File Persistence

The following are persisted between container restarts:
- Source code (mounted from host)
- Database data (named volume)
- Redis data (named volume)
- Node modules (named volumes for performance)
- Uploaded files
- Log files

## Security Notes

- Default passwords are for development only
- Environment files contain placeholder secrets
- Services are isolated within the container network
- No production data should be used in development

## Contributing

When contributing to the dev container setup:
1. Test changes thoroughly
2. Update this README
3. Ensure compatibility across platforms
4. Document any new services or tools The devcontainer provides a consistent, isolated development environment with all necessary tools and dependencies pre-installed.

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
