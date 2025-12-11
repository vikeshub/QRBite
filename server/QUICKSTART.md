# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Create Environment File
Copy the example file:
```bash
cp .env.example .env
```

Edit `.env` if needed (default values work for development):
```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:5172,http://localhost:5173,http://localhost:5174
```

### 3. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

You should see output like:
```
[2024-12-10 17:45:30] [INFO] Server running on http://localhost:3000
[2024-12-10 17:45:30] [INFO] Environment: development
[2024-12-10 17:45:30] [INFO] CORS Origin: http://localhost:5172, http://localhost:5173, http://localhost:5174
```

## Testing the API

### Health Check
```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-12-10T17:45:30.123Z",
  "uptime": 5.234
}
```

### Get All Menus
```bash
curl http://localhost:3000/api/menus
```

Response:
```json
{
  "success": true,
  "message": "Menus retrieved successfully",
  "data": [
    {
      "id": "1",
      "name": "Main Menu",
      "description": "Our main restaurant menu",
      "items": [...]
    }
  ]
}
```

### Create a Menu
```bash
curl -X POST http://localhost:3000/api/menus \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Drinks Menu",
    "description": "All beverages",
    "items": [
      {
        "id": "1",
        "name": "Coffee",
        "price": 2.99,
        "category": "Hot Beverages"
      }
    ]
  }'
```

### Get All Orders
```bash
curl http://localhost:3000/api/orders
```

### Create an Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "menuItems": [
      {
        "menuItemId": "1",
        "name": "Burger",
        "price": 9.99,
        "quantity": 2
      }
    ],
    "total": 19.98
  }'
```

## File Structure Explained

### `src/app.ts`
Main Express application setup, middleware configuration, and route registration.

### `src/index.ts`
Entry point - starts the server and handles unhandled errors.

### `src/config/env.ts`
Environment configuration management - loads and exports environment variables.

### `src/modules/[module]/`
Feature modules with controllers, services, and routes:
- **controllers/** - HTTP request handlers
- **services/** - Business logic
- **routes/** - API endpoint definitions

### `src/middleware/`
Cross-cutting concerns:
- `requestLogger.ts` - HTTP request/response logging
- `errorHandler.ts` - Centralized error handling

### `src/utils/`
Utility functions:
- `logger.ts` - Structured logging
- `response.ts` - API response helpers

### `src/types/`
TypeScript interfaces for type safety.

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with auto-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm run lint` | Check code for errors |
| `npm run format` | Format code with Prettier |

## Folder Structure When Running

After running the dev server, your structure will have:

```
server/
├── src/                    # Source files (TypeScript)
├── dist/                   # Compiled files (JavaScript) - generated on build
├── node_modules/           # Dependencies
├── .env                    # Environment variables (local)
├── .env.example           # Environment template
├── package.json           # Project config
└── tsconfig.json          # TypeScript config
```

## Next Steps

1. **Explore the codebase** - Check out existing modules
2. **Read ARCHITECTURE.md** - Understand the design patterns
3. **Add a new module** - Create your first feature following the patterns
4. **Connect to database** - Replace mock data with real database
5. **Add authentication** - Implement JWT tokens
6. **Add validation** - Validate incoming requests
7. **Write tests** - Add unit and integration tests

## Troubleshooting

### "Port 3000 is already in use"
Change port in `.env`:
```env
PORT=3001
```

### "EACCES: permission denied"
Run with appropriate permissions or use `sudo` (not recommended for production)

### "Module not found" errors
Run:
```bash
npm install
```

### Server crashes on startup
Check logs in console for error messages and review `.env` file.

## IDE Setup (VS Code)

### Recommended Extensions
1. **TypeScript Vue Plugin (Volar)**
2. **Prettier - Code formatter**
3. **ESLint**
4. **Thunder Client** or **REST Client** for API testing

### Debug Configuration
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "program": "${workspaceFolder}/src/index.ts",
      "preLaunchTask": "tsc: build",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

## Additional Resources

- **Express.js** - https://expressjs.com
- **TypeScript** - https://www.typescriptlang.org
- **Node.js** - https://nodejs.org

## Getting Help

1. Check error messages in the console
2. Review `src/app.ts` to understand request flow
3. Check existing modules for patterns
4. Review type definitions in `src/types/index.ts`
5. Check logging output with `LOG_LEVEL=debug` in `.env`

## Performance Tips

- Use `LOG_LEVEL=info` in production (less overhead)
- Enable caching for frequently accessed data
- Use pagination for large datasets
- Monitor database queries
- Use CDN for static files

Good luck! Happy coding! 🚀
