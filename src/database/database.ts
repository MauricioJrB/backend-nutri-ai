import { prisma } from '../utils/prisma';

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};
