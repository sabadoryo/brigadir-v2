import mongoose from 'mongoose';
import { config } from '../config';

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, {autoCreate: true});

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


export default connectDB; // Экспортируем, чтобы другие модули могли его использовать
