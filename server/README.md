# InstantMenu Backend Server

A scalable, enterprise-grade backend server for the InstantMenu application built with Express.js and TypeScript.

## Architecture Overview

```
src/
├── config/           # Configuration files (env, database, etc.)
├── middleware/       # Express middleware (logging, error handling)
├── modules/          # Feature modules
│   ├── menu/         # Menu management module
│   │   ├── controllers/
│   │   ├── services/
│   │   └── routes/
│   └── order/        # Order management module
│       ├── controllers/
│       ├── services/
│       └── routes/
├── types/            # TypeScript type definitions
├── utils/            # Utility functions (logger, response helpers)
├── app.ts            # Express application setup
└── index.ts          # Entry point
```

## Key Features

- **Modular Architecture**: Each feature is self-contained in its own module
- **Service Layer**: Business logic separated from HTTP handlers
- **Error Handling**: Centralized error handling with custom error classes
- **Logging**: Structured logging with configurable log levels
- **CORS Support**: Pre-configured for frontend communication
- **TypeScript**: Full type safety throughout the application
- **Scalable**: Ready for database integration and microservices

## Project Structure

### Controllers
Handle HTTP requests and responses. Located in `modules/[module]/controllers/`.

```typescript
export class MenuController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    // HTTP handler logic
  }
}
```

### Services
Contain business logic and data operations. Located in `modules/[module]/services/`.

```typescript
export class MenuService {
  async getAllMenus(): Promise<IMenu[]> {
    // Business logic
  }
}
```

### Routes
Define API endpoints. Located in `modules/[module]/routes/`.

```typescript
router.get('/', (req, res, next) => controller.getAll(req, res, next))
```

### Middleware
Handle cross-cutting concerns like logging and error handling.

```
middleware/
├── requestLogger.ts    # Request/response logging
└── errorHandler.ts     # Error handling
```

### Types
TypeScript interfaces for type safety.

```typescript
export interface IMenu {
  id?: string
  name: string
  items: IMenuItem[]
}
```

### Utils
Helper functions for common tasks.

```typescript
export const sendSuccess = <T>(res: Response, data: T, message: string)
export const logger = { debug, info, warn, error }
```

## Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:5172,http://localhost:5173,http://localhost:5174
DATABASE_URL=mongodb://localhost:27017/instantmenu
JWT_SECRET=your_jwt_secret_key_here
```

## Running the Server

### Development Mode
```bash
pnpm dev
```

Runs with auto-reload using `ts-node-dev`.

### Production Build
```bash
pnpm build
pnpm start
```

### Format Code
```bash
pnpm format
```

### Lint Code
```bash
pnpm lint
```

## API Endpoints

### Health Check
```bash
GET /health
```

### Menu Module
```bash
GET    /api/menus              # Get all menus
GET    /api/menus/:id          # Get menu by ID
POST   /api/menus              # Create menu
PUT    /api/menus/:id          # Update menu
DELETE /api/menus/:id          # Delete menu
```

### Order Module
```bash
GET    /api/orders             # Get all orders
GET    /api/orders/:id         # Get order by ID
POST   /api/orders             # Create order
PATCH  /api/orders/:id/status  # Update order status
DELETE /api/orders/:id         # Delete order
```

## Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* your data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

## Adding a New Module

1. Create module structure:
   ```bash
   mkdir -p src/modules/[module-name]/{controllers,services,routes}
   ```

2. Create service class with business logic
3. Create controller class with HTTP handlers
4. Create routes file with endpoints
5. Import routes in `app.ts`:
   ```typescript
   app.use('/api/[module-name]', [moduleNameRoutes])
   ```

## Scalability Roadmap

### Phase 1: Current
- ✅ Basic REST API structure
- ✅ Modular architecture
- ✅ Error handling & logging

### Phase 2: Database Integration
- [ ] MongoDB/PostgreSQL integration
- [ ] Database models & repositories
- [ ] Migration system

### Phase 3: Advanced Features
- [ ] JWT authentication
- [ ] Role-based access control (RBAC)
- [ ] Request validation & schema validation
- [ ] Caching layer (Redis)
- [ ] Rate limiting

### Phase 4: Production Ready
- [ ] Unit & integration tests
- [ ] API documentation (Swagger)
- [ ] Performance monitoring
- [ ] Docker containerization
- [ ] CI/CD pipelines

## Error Handling

The server uses a custom `AppError` class for consistent error handling:

```typescript
throw new AppError('Menu not found', 404)
```

All errors are caught by the centralized error handler middleware and returned in a consistent format.

## Logging

The logger utility provides structured logging:

```typescript
logger.debug('Debug message', { data: 'optional' })
logger.info('Info message')
logger.warn('Warning message')
logger.error('Error message')
```

Log level is configured via `LOG_LEVEL` environment variable.

## TypeScript Configuration

- Target: ES2020
- Module: ES2020
- Strict mode enabled
- Source maps for debugging
- Full type checking

## Development Tips

1. **Auto-reload**: Changes are automatically detected and the server restarts
2. **CORS**: Pre-configured to accept requests from frontend apps
3. **Health Check**: Use `/health` endpoint to verify server is running
4. **Logging**: Check console output for request logs and errors

## Next Steps

1. Set up database (MongoDB/PostgreSQL)
2. Create database models and repositories
3. Add authentication (JWT)
4. Add input validation
5. Add comprehensive tests
6. Deploy to cloud platform (AWS, Google Cloud, etc.)

## Contributing

- Follow the modular structure
- Add appropriate logging
- Handle errors properly
- Add TypeScript types
- Keep business logic in services

## License

ISC
