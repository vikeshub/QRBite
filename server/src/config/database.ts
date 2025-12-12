import mongoose from 'mongoose';
import { config } from './env';

export const connectDB = async () => {
  try {
    if (!config.database_url) {
      throw new Error('DATABASE_URL is not defined');
    }
    await mongoose.connect(config.database_url);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
});