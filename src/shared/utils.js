import dotenv from 'dotenv';
import secureRandom from 'secure-random';

const sayHi = () => {
  console.log('Hi');
  return 'hi';
};

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

const loadDevEnv = () => {
  if (!isProduction()) {
    dotenv.config({ path: '.env.local' });
    console.log('.env.local loaded');
  }
};

const generateSecret = () => {
  var secret = secureRandom(256, { type: 'Buffer' }); // Create a highly random byte array of 256 bytes
  return secret.toString('base64');
};

export { isProduction, loadDevEnv, generateSecret, sayHi };