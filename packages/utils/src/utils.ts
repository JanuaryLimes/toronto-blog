import dotenv from 'dotenv';
import { join } from 'path';
const secureRandom = require('secure-random');

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function isTesting() {
  return process.env.NODE_ENV === 'testing';
}

const loadDevEnv = () => {
  if (!isProduction()) {
    const envPath = join(__dirname, '../../../.env');
    console.log('### envPath', envPath);
    dotenv.config({ path: envPath });
    console.log('.env loaded');
  }
};

const generateSecret = () => {
  const secret = secureRandom(256, { type: 'Buffer' }); // Create a highly random byte array of 256 bytes
  return secret.toString('base64');
};

export function env() {
  loadDevEnv();

  return {
    JWT_EXPIRATION_MS: process.env.JWT_EXPIRATION_MS || '129600000',
    MONGO_CS: process.env.MONGO_CS || '',
    SECRET: process.env.SECRET || '',
    PORT: process.env.PORT || ''
  };
}

export { isProduction, isTesting, generateSecret };
