import { App } from './app';
import * as bodyParser from 'body-parser';
import { loggerMiddleware } from './middleware/logger';
import { HomeController } from './controllers/home.controller';
import { env } from '@toronto-blog/utils';
import https from './https';
import cookieParser = require('cookie-parser');
import cors from 'cors';
import './auth/passportSetup';

const app = new App({
  port: Number(env().PORT) || 5002,
  controllers: [new HomeController()],
  middleWares: [
    cookieParser(),
    cors(),
    https,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
});

app.listen();
