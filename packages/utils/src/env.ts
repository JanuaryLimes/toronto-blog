import { isProduction } from './utils';
import dotenv from 'dotenv';
import { join } from 'path';

if (!isProduction()) {
  const envPath = join(__dirname, '../../../.env');
  console.log('### envPath', envPath);
  dotenv.config({ path: envPath });
  console.log('.env loaded');
}

export const ENV = {
  JWT_EXPIRATION_MS: process.env.JWT_EXPIRATION_MS || '129600000',
  MONGO_DB: process.env.MONGO_DB || '',
  MONGO_URL: process.env.MONGO_URL || '',
  SECRET: process.env.SECRET || '',
  PORT: process.env.PORT || ''
};
