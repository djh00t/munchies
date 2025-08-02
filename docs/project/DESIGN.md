# Munchies - Design Document

## System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Web App       │    │   Admin Panel   │
│  (React Native) │    │   (Next.js)     │    │   (Next.js)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
         ┌─────────────────────────────────────────────────┐
         │              API Gateway                        │
         │           (Node.js/Express)                     │
         └─────────────────────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PostgreSQL    │    │      Redis      │    │   File Storage  │
│   (Primary DB)  │    │    (Cache)      │    │    (Images)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Component Architecture

#### Backend Services
- **Authentication Service**: JWT and OAuth handling
- **Inventory Service**: Photo processing and inventory management
- **Recipe Service**: Spoonacular integration and caching
- **Meal Planning Service**: AI-powered meal suggestions
- **Shopping Service**: List management and delivery integration
- **AI Service**: GitHub AI API integration
- **Notification Service**: Push notifications and alerts

#### Frontend Applications
- **Mobile App**: React Native with shared components
- **Web Application**: Next.js with SSR/SSG optimization
- **Admin Panel**: React-based management interface

## Database Design

### Entity Relationship Diagram

```
Users (1) ──── (N) UserPreferences
  │
  └── (1) ──── (N) Inventory
  │
  └── (1) ──── (N) MealPlans
  │
  └── (1) ──── (N) ShoppingLists
  │
  └── (1) ──── (N) RecipeFeedback

Recipes (1) ──── (N) RecipeIngredients
  │
  └── (1) ──── (N) RecipeFeedback
  │
  └── (1) ──── (N) MealPlanRecipes

Ingredients (1) ──── (N) RecipeIngredients
  │
  └── (1) ──── (N) Inventory
  │
  └── (1) ──── (N) ShoppingListItems
```

### Core Tables

#### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    oauth_provider VARCHAR(50),
    oauth_id VARCHAR(255),
    display_name VARCHAR(255),
    profile_image_url TEXT,
    subscription_tier VARCHAR(50) DEFAULT 'free',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Inventory Table
```sql
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    ingredient_id UUID REFERENCES ingredients(id),
    quantity DECIMAL,
    unit VARCHAR(50),
    expiry_date DATE,
    purchase_date DATE,
    confidence_level INTEGER DEFAULT 100,
    last_used_date TIMESTAMP,
    usage_frequency INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Recipes Table
```sql
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    spoonacular_id INTEGER,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    instructions TEXT,
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    difficulty_level INTEGER,
    cuisine_type VARCHAR(100),
    diet_tags TEXT[],
    image_url TEXT,
    nutrition_data JSONB,
    cached_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);
```

## API Design

### REST API Endpoints

#### Authentication
```
POST /api/auth/login           - OAuth login
POST /api/auth/logout          - Logout user
GET  /api/auth/me              - Get current user
PUT  /api/auth/profile         - Update user profile
```

#### Inventory Management
```
GET    /api/inventory          - Get user inventory
POST   /api/inventory          - Add inventory item
PUT    /api/inventory/:id      - Update inventory item
DELETE /api/inventory/:id      - Remove inventory item
POST   /api/inventory/photo    - Process photo for inventory
GET    /api/inventory/check/:ingredient - Check if ingredient exists
```

#### Recipe Management
```
GET  /api/recipes              - Search recipes
GET  /api/recipes/:id          - Get recipe details
POST /api/recipes/feedback     - Submit recipe feedback
GET  /api/recipes/suggestions  - Get personalized suggestions
GET  /api/recipes/by-ingredients - Find recipes by available ingredients
```

#### Meal Planning
```
GET  /api/meal-plans           - Get user meal plans
POST /api/meal-plans           - Create meal plan
PUT  /api/meal-plans/:id       - Update meal plan
GET  /api/meal-plans/suggestions - Get meal suggestions
```

#### Shopping Lists
```
GET    /api/shopping-lists     - Get shopping lists
POST   /api/shopping-lists     - Create shopping list
PUT    /api/shopping-lists/:id - Update shopping list
DELETE /api/shopping-lists/:id - Delete shopping list
POST   /api/shopping-lists/generate - Generate from meal plan
```

#### AI Chat
```
POST /api/chat                 - Send message to AI
GET  /api/chat/history         - Get chat history
POST /api/chat/voice           - Voice message processing
```

## User Interface Design

### Mobile App Flow

```
Splash Screen
    │
    ├─ Onboarding (New Users)
    │   ├─ Welcome
    │   ├─ Food Preferences
    │   ├─ Cooking Style
    │   ├─ Dietary Restrictions
    │   └─ Permissions
    │
    └─ Main App
        ├─ Home Dashboard
        │   ├─ Quick Actions
        │   ├─ Today's Meals
        │   └─ Inventory Alerts
        │
        ├─ Inventory
        │   ├─ Camera Capture
        │   ├─ Manual Entry
        │   └─ Item Management
        │
        ├─ Recipes
        │   ├─ Search
        │   ├─ Suggestions
        │   └─ Favorites
        │
        ├─ Meal Planning
        │   ├─ Calendar View
        │   ├─ Meal Suggestions
        │   └─ Batch Planning
        │
        ├─ Shopping
        │   ├─ Current Lists
        │   ├─ Auto-generated
        │   └─ Delivery Options
        │
        └─ Profile
            ├─ Preferences
            ├─ Subscription
            └─ Settings
```

### Key UI Components

#### Photo Capture Interface
- Camera viewfinder with overlay guides
- Capture button with haptic feedback
- Processing indicator with progress
- Review screen with detected items
- Manual editing capability

#### Recipe Cards
- High-quality food images
- Difficulty and time indicators
- Ingredient availability status
- Quick save/favorite actions
- Nutrition highlights

#### Inventory Management
- Grid/list view toggle
- Expiration date warnings
- Quick quantity adjustments
- Smart sorting options
- Search and filter capabilities

#### Meal Planning Calendar
- Weekly/monthly views
- Drag-and-drop meal assignment
- Batch cooking indicators
- Shopping list integration
- Effort level visualization

## Security Design

### Authentication Flow
```
1. User initiates OAuth login (Apple/Google)
2. OAuth provider validates and returns authorization code
3. Backend exchanges code for access token
4. Backend generates JWT with user claims
5. JWT stored securely on client (keychain/keystore)
6. JWT included in API request headers
7. Backend validates JWT on each request
```

### Data Protection
- **Encryption**: AES-256 for data at rest
- **TLS**: All API communications over HTTPS
- **JWT**: Short-lived tokens with refresh capability
- **API Rate Limiting**: Prevent abuse and DoS attacks
- **Input Validation**: Sanitize all user inputs
- **Image Processing**: Secure OCR processing pipeline

### Privacy Considerations
- **Data Minimization**: Collect only necessary data
- **User Consent**: Clear opt-in for data collection
- **Data Retention**: Automatic deletion of old data
- **Export Capability**: Users can export their data
- **Deletion**: Complete data removal on account deletion

## Performance Design

### Caching Strategy
- **Redis**: API responses, recipe data, user sessions
- **CDN**: Static assets, images, public content
- **Database**: Query result caching for expensive operations
- **Mobile**: Local SQLite cache for offline functionality

### Image Processing Pipeline
```
1. Image Upload → 2. Preprocessing → 3. OCR Processing → 4. Text Extraction
       │                  │               │                    │
       ▼                  ▼               ▼                    ▼
   Compression    →  Enhancement  →  Text Recognition  →  Data Parsing
       │                  │               │                    │
       ▼                  ▼               ▼                    ▼
   Cloud Storage  →  Machine Learning → Confidence Scoring → Result Return
```

### Optimization Strategies
- **Lazy Loading**: Load content as needed
- **Image Optimization**: Multiple resolutions and formats
- **API Pagination**: Limit response sizes
- **Database Indexing**: Optimize query performance
- **Connection Pooling**: Efficient database connections

## Integration Design

### Third-party Services

#### Spoonacular API Integration
```javascript
class SpoonacularService {
    async searchRecipes(query, dietary) {
        // Check cache first
        const cached = await redis.get(`recipes:${query}:${dietary}`);
        if (cached) return JSON.parse(cached);
        
        // Fetch from API
        const response = await spoonacularAPI.search(query, dietary);
        
        // Cache results
        await redis.setex(`recipes:${query}:${dietary}`, 3600, JSON.stringify(response));
        
        return response;
    }
}
```

#### GitHub AI Integration
```javascript
class AIService {
    async processMessage(userId, message) {
        const context = await this.getUserContext(userId);
        const prompt = this.buildPrompt(message, context);
        
        const response = await githubAI.chat({
            model: "claude-sonnet-4",
            messages: [{ role: "user", content: prompt }]
        });
        
        return this.parseResponse(response);
    }
}
```

### Mobile Platform Integration
- **Camera**: Native camera access for photo capture
- **Storage**: Secure keychain/keystore for sensitive data
- **Notifications**: Push notifications for meal reminders
- **Sharing**: Native sharing for recipes and meal plans
- **Voice**: Speech-to-text for voice commands

## Deployment Design

### Infrastructure
```
Production Environment:
├─ Load Balancer (AWS ALB)
├─ Application Servers (ECS/Fargate)
├─ Database Cluster (RDS PostgreSQL)
├─ Cache Cluster (ElastiCache Redis)
├─ File Storage (S3)
├─ CDN (CloudFront)
└─ Monitoring (CloudWatch)

Development Environment:
├─ Docker Compose
├─ Local PostgreSQL
├─ Local Redis
└─ Local File Storage
```

### CI/CD Pipeline
```
1. Code Push → 2. Automated Tests → 3. Build → 4. Deploy to Staging
      │               │               │            │
      ▼               ▼               ▼            ▼
   Git Hooks  →  Unit/Integration → Docker Build → Environment Test
      │               │               │            │
      ▼               ▼               ▼            ▼
   Linting    →    E2E Tests     → Image Push  → Production Deploy
```

### Monitoring and Analytics
- **Application Monitoring**: Error tracking and performance metrics
- **User Analytics**: Feature usage and engagement tracking
- **Business Metrics**: Revenue, conversion, and retention tracking
- **Infrastructure Monitoring**: System health and resource usage
