import dotenv from 'dotenv'

dotenv.config()

export const config = {
  node_env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  log_level: process.env.LOG_LEVEL || 'info',
  cors_origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5172'],
  database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/instantmenu',
  jwt_secret: process.env.JWT_SECRET || 'dev_secret_key',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
}

export default config
