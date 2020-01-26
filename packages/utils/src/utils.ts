import dotenv from 'dotenv';
const secureRandom = require('secure-random');

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

const loadDevEnv = () => {
  if (!isProduction()) {
    /* const result = */ dotenv.config({ path: '../../.env.local' });
    console.log('.env.local loaded' /* , result */);
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

export { isProduction, generateSecret };
