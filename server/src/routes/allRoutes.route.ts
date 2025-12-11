import { Express } from 'express';
import healthRoute from '../modules/utils/routes/health.route';

export default function loadRoutes(app: Express) {
 // Default route
 app.get('/', (req, res) => {
   res.json({
     name: 'InstantMenu API',
     version: '1.0.0',
     status: 'running',
     endpoints: {
       health: '/health',
       menus: '/api/menus',
       orders: '/api/orders'
     }
   });
 });

 app.use('/health', healthRoute);
}
