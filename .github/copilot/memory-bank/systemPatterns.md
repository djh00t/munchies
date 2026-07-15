# System Patterns - Munchies

## Architecture Patterns

### Monorepo Structure
```
packages/
├── backend/          # Node.js/Express API
├── web/             # Next.js web application  
├── mobile/          # React Native app (future)
└── shared/          # Shared utilities and types
```

### API Design Patterns

#### RESTful Endpoints
- `GET /api/inventory` - List user inventory
- `POST /api/inventory/photo` - Process inventory photo
- `GET /api/recipes/suggest` - Get meal suggestions
- `POST /api/meal-plans` - Create meal plan
- `GET /api/shopping-lists` - Get shopping lists

#### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    pagination?: PaginationInfo;
    cache?: CacheInfo;
  };
}
```

### Database Patterns

#### Entity Relationships
- Users → (1:N) → Inventory Items
- Users → (1:N) → Meal Plans  
- Users → (1:N) → Shopping Lists
- Recipes → (N:M) → Ingredients
- Users → (N:M) → Recipes (via feedback)

#### Confidence-Based Inventory
```typescript
interface InventoryItem {
  id: string;
  ingredientId: string;
  quantity: number;
  unit: string;
  confidenceLevel: number; // 0-100
  lastConfirmed: Date;
  expiryDate?: Date;
}
```

### Caching Strategy

#### Multi-Level Caching
1. **Redis**: API responses, recipe data, user sessions
2. **Database**: Materialized views for complex queries
3. **CDN**: Static assets, public recipe images
4. **Client**: Offline-first mobile data

#### Cache Keys
```
recipe:{id}
user:{id}:inventory
user:{id}:preferences
suggestions:{userId}:{hash}
```

### Error Handling Patterns

#### Structured Error Types
```typescript
enum ErrorType {
  VALIDATION = 'validation',
  AUTH = 'authentication', 
  NOT_FOUND = 'not_found',
  EXTERNAL_API = 'external_api',
  SYSTEM = 'system'
}

interface AppError {
  type: ErrorType;
  message: string;
  details?: Record<string, any>;
  statusCode: number;
}
```

#### Graceful Degradation
- Recipe suggestions work without Spoonacular API
- Meal planning continues without AI service
- Core inventory functions work offline
- Manual fallbacks for all automated features

### Security Patterns

#### Authentication Flow
1. OAuth provider authentication
2. JWT token generation with refresh
3. Role-based access control
4. API rate limiting per user

#### Data Protection
- Encrypt PII at rest
- Hash sensitive data
- Audit trail for data changes
- GDPR compliance patterns

### Performance Patterns

#### Image Processing Pipeline
1. Client-side compression
2. Server upload to temp storage
3. Background OCR processing
4. Result caching and cleanup
5. Progressive result delivery

#### Query Optimization
- Database indexing strategy
- Query result pagination
- Eager loading for common paths
- Background data preparation

### Integration Patterns

#### External API Management
```typescript
interface ExternalApiService {
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string, data: any): Promise<T>;
  handleRateLimit(): Promise<void>;
  fallbackStrategy(): T;
}
```

#### Event-Driven Architecture
- User action events
- Inventory change events  
- Recipe feedback events
- System health events

### Testing Patterns

#### Test Pyramid
- **Unit Tests**: Business logic, utilities
- **Integration Tests**: API endpoints, database
- **E2E Tests**: Critical user journeys
- **Contract Tests**: External API integrations

#### Test Data Management
- Factory pattern for test data
- Database seeding for integration tests
- Mock external services
- Snapshot testing for UI components

### Deployment Patterns

#### Containerization
```dockerfile
# Multi-stage build pattern
FROM node:18-alpine AS builder
FROM node:18-alpine AS runtime
```

#### Environment Management
- Development: Local Docker containers
- Staging: Cloud-hosted preview
- Production: Scalable cloud deployment
- Feature branches: Ephemeral environments

### Monitoring Patterns

#### Observability Stack
- **Logs**: Structured JSON logging
- **Metrics**: Business and technical KPIs
- **Traces**: Request flow tracking
- **Alerts**: Proactive issue detection

#### Health Checks
- Service health endpoints
- Database connectivity
- External API availability
- Resource utilization monitoring
