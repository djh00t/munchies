# Munchies - Development Guide

A comprehensive meal planning and inventory management application that helps users eat well, maintain variety, and minimize food waste through smart technology integration.

## 🚀 Quick Start

### Option 1: Development Container (Recommended)

The easiest way to get started is using VS Code with Dev Containers:

1. **Prerequisites:**
   - [VS Code](https://code.visualstudio.com/)
   - [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/)

2. **Open in Dev Container:**
   ```bash
   git clone https://github.com/djh00t/munchies.git
   cd munchies
   code .
   ```
   - When prompted, click "Reopen in Container"
   - Or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"

3. **Start developing:**
   ```bash
   npm run dev
   ```

> **Note:** The devcontainer automatically sets up the entire development environment including database, dependencies, and VS Code extensions.

### Option 2: Local Development

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Local Setup Development Environment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/djh00t/munchies.git
   cd munchies
   ```

2. **Run setup script:**
   ```bash
   ./scripts/setup-dev.sh
   ```

3. **Configure environment:**
   ```bash
   # Edit .env file with your API keys
   cp .env.example .env
   nano .env
   ```

4. **Start development services:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
munchies/
├── packages/
│   ├── backend/          # Express.js API server
│   ├── web/              # Next.js web application (TODO)
│   ├── mobile/           # React Native mobile app (TODO)
│   └── admin/            # Admin panel (TODO)
├── scripts/              # Development scripts
├── docs/                 # Documentation
├── docker-compose.yml    # Docker services
└── package.json          # Monorepo configuration
```

## 🛠️ Development Services

| Service | URL | Description |
|---------|-----|-------------|
| Backend API | http://localhost:3001 | Express.js REST API |
| PostgreSQL | localhost:5432 | Primary database |
| Redis | localhost:6379 | Cache and sessions |
| Web App | http://localhost:3000 | Next.js web app (TODO) |
| Admin Panel | http://localhost:3002 | Admin interface (TODO) |

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start backend and web in development mode
- `npm run build` - Build all packages
- `npm run test` - Run tests for all packages
- `npm run lint` - Lint all packages

### Backend Specific
- `npm run dev:backend` - Start backend only
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with test data

### Docker Management
- `./scripts/start-dev.sh` - Start all Docker services
- `./scripts/stop-dev.sh` - Stop all Docker services
- `docker-compose logs -f` - View live logs

## 🗃️ Database

### Connection
- **Host:** localhost
- **Port:** 5432
- **Database:** munchies_dev
- **Username:** munchies
- **Password:** munchies123

### Management
```bash
# Run migrations
npm run db:migrate --workspace=packages/backend

# Seed test data
npm run db:seed --workspace=packages/backend

# Open Prisma Studio
npm run db:studio --workspace=packages/backend
```

## 🔑 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://munchies:munchies123@localhost:5432/munchies_dev

# API Keys (get from respective services)
SPOONACULAR_API_KEY=your-key-here
GITHUB_AI_API_KEY=your-key-here
GOOGLE_CLIENT_ID=your-client-id
APPLE_CLIENT_ID=your-client-id

# JWT Secrets (generate secure keys)
JWT_SECRET=your-super-secret-jwt-key
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - OAuth login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Inventory
- `GET /api/inventory` - Get user inventory
- `POST /api/inventory` - Add inventory item
- `POST /api/inventory/photo` - Process photo for inventory

### Recipes
- `GET /api/recipes` - Search recipes
- `GET /api/recipes/suggestions` - Get personalized suggestions
- `POST /api/recipes/feedback` - Submit recipe feedback

### Meal Planning
- `GET /api/meal-plans` - Get meal plans
- `POST /api/meal-plans` - Create meal plan
- `GET /api/meal-plans/suggestions` - Get meal suggestions

### Shopping Lists
- `GET /api/shopping-lists` - Get shopping lists
- `POST /api/shopping-lists` - Create shopping list
- `POST /api/shopping-lists/generate` - Generate from meal plan

### AI Chat
- `POST /api/chat` - Send message to AI
- `GET /api/chat/history` - Get chat history

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests only
npm test --workspace=packages/backend

# Run tests in watch mode
npm run test:watch --workspace=packages/backend
```

## 🐛 Debugging

### Backend Debugging
1. The backend runs with debugging enabled on port 9229
2. Attach your debugger to `localhost:9229`
3. Use VS Code's "Attach to Node" configuration

### Logs
```bash
# View all logs
docker-compose logs -f

# View backend logs only
docker-compose logs -f backend

# View database logs
docker-compose logs -f postgres
```

## 📱 Mobile Development (TODO)

React Native setup will include:
- iOS and Android build configurations
- Camera integration for photo capture
- Offline data synchronization
- Push notifications

## 🌐 Web Development (TODO)

Next.js web application will include:
- Server-side rendering for SEO
- Progressive Web App features
- Responsive design
- Blog and public recipes section

## 🚀 Deployment

### Development
Uses Docker Compose for local development with hot reloading.

### Production (TODO)
Will use:
- AWS ECS/Fargate for containers
- RDS PostgreSQL for database
- ElastiCache for Redis
- CloudFront for CDN
- S3 for file storage

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests
4. Run linting and tests
5. Submit a pull request

## 📖 Documentation

- [Requirements](REQUIREMENTS.md) - Functional and technical requirements
- [Design](DESIGN.md) - System architecture and design decisions
- [Tasks](TASKS.md) - Development tasks and project phases
- [API Documentation](docs/api.md) - Detailed API reference (TODO)

## 🆘 Troubleshooting

### Common Issues

**Docker services won't start:**
```bash
# Reset Docker environment
docker-compose down -v
docker-compose up -d
```

**Database connection issues:**
```bash
# Check if PostgreSQL is running
docker-compose ps postgres
# Check logs
docker-compose logs postgres
```

**Node modules issues:**
```bash
# Clean install
npm run clean
npm install
```

**Port conflicts:**
```bash
# Check what's using the ports
lsof -i :3001  # Backend
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis
```

## 📞 Support

For development questions and issues:
1. Check the troubleshooting section above
2. Review the documentation in the `docs/` directory
3. Check existing GitHub issues
4. Create a new issue with detailed information

---

**Happy coding! 🍕**
