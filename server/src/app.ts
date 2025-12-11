import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config/env';
import loadRoutes from './routes/allRoutes.route';

const app: Express = express();

// Core Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.cors_origin,
    credentials: true,
  })
);

// Load all API routes
loadRoutes(app);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `${req.method} ${req.path}`,
  });
});

export { app };
