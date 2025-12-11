import { app } from './app';
import { config } from './config/env';

const startServer = () => {
  app.listen(config.port, () => {
    console.log(`🚀 Server running in ${config.node_env} on port ${config.port}`);
  });
};

startServer();
