import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL!,
  PORT: process.env.PORT || 3000,
};
