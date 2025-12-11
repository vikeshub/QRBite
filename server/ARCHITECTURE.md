# InstantMenu Backend - Scalable Architecture Setup

## Architecture Overview

This document outlines the scalable, enterprise-grade backend architecture for InstantMenu.

### Directory Structure

```
server/
├── src/
│   ├── config/              # Configuration management
│   │   └── env.ts          # Environment variables
│   ├── middleware/          # Express middleware
│   │   ├── requestLogger.ts # HTTP request logging
│   │   └── errorHandler.ts  # Centralized error handling
│   ├── modules/             # Feature modules (scalable)
│   │   ├── menu/           # Menu management
│   │   │   ├── controllers/ # HTTP handlers
│   │   │   ├── services/   # Business logic
│   │   │   └── routes/     # API endpoints
│   │   └── order/          # Order management
│   │       ├── controllers/
│   │       ├── services/
│   │       └── routes/
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts       # All type definitions
│   ├── utils/              # Utility functions
│   │   ├── logger.ts      # Structured logging
│   │   └── response.ts    # API response helpers
│   ├── app.ts             # Express app configuration
│   └── index.ts           # Application entry point
├── dist/                  # Compiled JavaScript (generated)
├── .env.example          # Environment template
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies
└── README.md            # Project documentation
```

## Architecture Layers

### 1. **Controller Layer**
Handles HTTP requests and responses.

**Location:** `src/modules/[module]/controllers/`

```typescript
export class MenuController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const menus = await menuService.getAllMenus()
      sendSuccess(res, menus, 'Menus retrieved successfully')
    } catch (error) {
      next(error)
    }
  }
}
```

**Responsibilities:**
- Parse HTTP requests
- Call service methods
- Format responses
- Handle request validation

### 2. **Service Layer**
Contains all business logic and data operations.

**Location:** `src/modules/[module]/services/`

```typescript
export class MenuService {
  async getAllMenus(): Promise<IMenu[]> {
    logger.debug('MenuService: Getting all menus')
    return menus // In future: fetch from database
  }
}
```

**Responsibilities:**
- Business logic implementation
- Data operations
- Business rule validation
- Interaction with repositories/database

### 3. **Route Layer**
Defines API endpoints and routes requests to controllers.

**Location:** `src/modules/[module]/routes/`

```typescript
const router: RouterType = Router()

router.get('/', (req, res, next) => controller.getAll(req, res, next))
router.post('/', (req, res, next) => controller.create(req, res, next))
router.get('/:id', (req, res, next) => controller.getById(req, res, next))
router.put('/:id', (req, res, next) => controller.update(req, res, next))
router.delete('/:id', (req, res, next) => controller.delete(req, res, next))

export default router
```

**Responsibilities:**
- Define HTTP methods and paths
- Route requests to appropriate controllers
- Document API endpoints

### 4. **Middleware Layer**
Handle cross-cutting concerns.

**Request Logger:** Logs all HTTP requests
```typescript
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info(`${req.method} ${req.path}`, { status: res.statusCode, duration })
  })
  next()
}
```

**Error Handler:** Centralized error handling
```typescript
export const errorHandler = (err: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return sendError(res, err.message, 'Error', err.statusCode)
  }
  sendError(res, err.message || 'Internal Server Error', 'Server Error', 500)
}
```

### 5. **Utility Layer**
Helper functions and utilities.

**Logger:**
```typescript
logger.debug('Debug message')
logger.info('Info message')
logger.warn('Warning message')
logger.error('Error message')
```

**Response Helpers:**
```typescript
sendSuccess(res, data, 'Success message', 200)
sendError(res, 'Error detail', 'Error message', 400)
```

### 6. **Type Layer**
TypeScript interfaces for type safety.

```typescript
export interface IMenu {
  id?: string
  name: string
  description?: string
  items: IMenuItem[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}
```

## Request Flow

```
HTTP Request
    ↓
Middleware (CORS, JSON parsing, Logging)
    ↓
Router → Controller
    ↓
Service (Business Logic)
    ↓
Repository/Database (future)
    ↓
Service → Controller
    ↓
Response Helper (sendSuccess/sendError)
    ↓
HTTP Response
    ↓
Error Handler (if error occurs)
```

## Current API Endpoints

### Menu Module
```
GET    /api/menus              # Get all menus
GET    /api/menus/:id          # Get menu by ID
POST   /api/menus              # Create new menu
PUT    /api/menus/:id          # Update menu
DELETE /api/menus/:id          # Delete menu
```

### Order Module
```
GET    /api/orders             # Get all orders
GET    /api/orders/:id         # Get order by ID
POST   /api/orders             # Create new order
PATCH  /api/orders/:id/status  # Update order status
DELETE /api/orders/:id         # Delete order
```

### Health Check
```
GET    /health                 # Server health status
```

## How to Add New Modules

### Step 1: Create Module Structure
```bash
mkdir -p src/modules/[module-name]/{controllers,services,routes}
```

### Step 2: Create Service Class
**File:** `src/modules/[module]/services/[Module]Service.ts`

```typescript
import { I[Module] } from '../../../types'
import { logger } from '../../../utils/logger'

export class [Module]Service {
  async get All(): Promise<I[Module][]> {
    logger.debug('[Module]Service: Getting all items')
    // Your business logic
  }
}
```

### Step 3: Create Controller Class
**File:** `src/modules/[module]/controllers/[Module]Controller.ts`

```typescript
import { [Module]Service } from '../services/[Module]Service'
import { sendSuccess } from '../../../utils/response'

const service = new [Module]Service()

export class [Module]Controller {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await service.getAll()
      sendSuccess(res, items, 'Items retrieved')
    } catch (error) {
      next(error)
    }
  }
}
```

### Step 4: Create Routes
**File:** `src/modules/[module]/routes/index.ts`

```typescript
import { Router } from 'express'
import type { Router as RouterType } from 'express'
import { [Module]Controller } from '../controllers/[Module]Controller'

const router: RouterType = Router()
const controller = new [Module]Controller()

router.get('/', (req, res, next) => controller.getAll(req, res, next))
router.post('/', (req, res, next) => controller.create(req, res, next))

export default router
```

### Step 5: Register in app.ts
**File:** `src/app.ts`

```typescript
import [moduleName]Routes from './modules/[module]/routes'

app.use('/api/[modules]', [moduleName]Routes)
```

### Step 6: Add Types
**File:** `src/types/index.ts`

```typescript
export interface I[Module] {
  id?: string
  name: string
  // Other fields
}
```

## Scalability Features

### 1. **Modular Architecture**
- Each module is self-contained
- Easy to add new features
- Clear separation of concerns
- Reusable patterns

### 2. **Service Layer**
- Business logic isolated
- Easy to unit test
- Repository pattern ready
- Database-agnostic

### 3. **Error Handling**
- Centralized error handling
- Custom error classes
- Consistent error responses
- Error logging

### 4. **Logging**
- Structured logging
- Configurable log levels
- Request/response tracking
- Debug capabilities

### 5. **Configuration Management**
- Environment variables
- Easy deployment
- Different configs per environment
- Secure secrets handling

## Future Enhancements

### Phase 1: Database Integration (Next)
- [ ] MongoDB or PostgreSQL integration
- [ ] Repository pattern implementation
- [ ] Database migrations
- [ ] Connection pooling
- [ ] Query optimization

### Phase 2: Authentication & Authorization
- [ ] JWT implementation
- [ ] User authentication
- [ ] Role-based access control (RBAC)
- [ ] Permission system
- [ ] Session management

### Phase 3: Validation & Security
- [ ] Input validation middleware
- [ ] Schema validation (Joi, Yup)
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] SQL injection prevention
- [ ] XSS protection

### Phase 4: Advanced Features
- [ ] Caching (Redis)
- [ ] File uploads
- [ ] Background jobs (Bull)
- [ ] Real-time updates (WebSockets)
- [ ] Search capabilities (Elasticsearch)
- [ ] Analytics

### Phase 5: Testing & Quality
- [ ] Unit tests (Jest)
- [ ] Integration tests
- [ ] E2E tests
- [ ] Code coverage
- [ ] Performance testing
- [ ] Load testing

### Phase 6: Production Ready
- [ ] API documentation (Swagger)
- [ ] Health checks
- [ ] Monitoring & observability
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Docker containerization
- [ ] CI/CD pipelines

## Environment Variables

Create a `.env` file in the server root:

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:5172,http://localhost:5173,http://localhost:5174
DATABASE_URL=mongodb://localhost:27017/instantmenu
JWT_SECRET=your_jwt_secret_key_here
```

## Running the Server

### Development
```bash
cd server
npm install
npm run dev
```

Server runs on `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Code Quality
```bash
npm run lint
npm run format
```

## Design Principles

### 1. **Single Responsibility**
Each class/function has one reason to change.

### 2. **Dependency Injection**
Services are passed to controllers (via constructor or parameters).

### 3. **Error Handling**
All errors are caught and handled consistently.

### 4. **Logging**
Important operations are logged for debugging and monitoring.

### 5. **Type Safety**
Full TypeScript support with strict mode enabled.

### 6. **Separation of Concerns**
Controllers handle HTTP, Services handle business logic, Routes handle mapping.

### 7. **DRY (Don't Repeat Yourself)**
Utility functions and middleware prevent code duplication.

### 8. **Scalability**
Architecture supports adding new modules and features easily.

## Best Practices

1. **Always use services** - Controllers should only handle HTTP
2. **Log important operations** - Help with debugging and monitoring
3. **Handle errors properly** - Use AppError for known errors
4. **Type everything** - Take advantage of TypeScript
5. **Keep modules focused** - One module = one domain
6. **Write reusable code** - Use utilities and helpers
7. **Follow naming conventions** - Consistent naming patterns
8. **Document complex logic** - Comments for tricky business logic

## Troubleshooting

### Server won't start
1. Check if port 3000 is available
2. Verify `.env` file exists
3. Check Node.js version (>= 18)
4. Run `npm install` to ensure dependencies are installed

### Module not found errors
1. Check import paths
2. Verify file names and locations
3. Ensure exports are correct in services/controllers

### CORS errors
1. Update `CORS_ORIGIN` in `.env`
2. Check frontend URLs match
3. Verify `credentials: true` if needed

### Database connection issues (Phase 2+)
1. Check `DATABASE_URL` in `.env`
2. Verify database is running
3. Check credentials
4. Review connection string format

## Performance Considerations

1. **Caching** - Redis for frequently accessed data
2. **Database optimization** - Proper indexing and queries
3. **Pagination** - Limit large datasets
4. **Compression** - Gzip responses
5. **Connection pooling** - Reuse database connections
6. **Monitoring** - Track performance metrics

## Security Considerations

1. **Environment variables** - Never commit secrets
2. **Input validation** - Validate all user inputs
3. **Authentication** - Implement JWT tokens
4. **CORS** - Whitelist allowed origins
5. **Rate limiting** - Prevent abuse
6. **Error messages** - Don't expose sensitive info
7. **Logging** - Log security events
8. **Dependencies** - Keep packages updated

## License

ISC
