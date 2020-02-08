const secureRandom = require('secure-random');

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function isTesting() {
  return process.env.NODE_ENV === 'testing';
}

const generateSecret = () => {
  const secret = secureRandom(256, { type: 'Buffer' }); // Create a highly random byte array of 256 bytes
  return secret.toString('base64');
};

export { isProduction, isTesting, generateSecret };
