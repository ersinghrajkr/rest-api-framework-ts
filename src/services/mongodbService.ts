// # Database interaction logic

// src/services/dbService.ts
import mongoose from 'mongoose';
import { config } from '../config/env';

export const connectDb = async () => {
  await mongoose.connect(config.dbUrl);
};

export const disconnectDb = async () => {
  await mongoose.disconnect();
};