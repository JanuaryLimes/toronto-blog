"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sayDupa = exports.generateSecret = exports.loadDevEnv = exports.isProduction = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _secureRandom = _interopRequireDefault(require("secure-random"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sayDupa = function sayDupa() {
  console.log('dupa from util');
  return 'dupa from util ___';
};

exports.sayDupa = sayDupa;

var isProduction = function isProduction() {
  return process.env.NODE_ENV === 'production';
};

exports.isProduction = isProduction;

var loadDevEnv = function loadDevEnv() {
  if (!isProduction()) {
    _dotenv.default.config({
      path: '.env.local'
    });

    console.log('.env.local loaded');
  }
};

exports.loadDevEnv = loadDevEnv;

var generateSecret = function generateSecret() {
  var secret = (0, _secureRandom.default)(256, {
    type: 'Buffer'
  }); // Create a highly random byte array of 256 bytes

  return secret.toString('base64');
};

exports.generateSecret = generateSecret;