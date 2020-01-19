import { App } from './app';
import * as bodyParser from 'body-parser';
import { loggerMiddleware } from './middleware/logger';
import { HomeController } from './controllers/home.controller';

const app = new App({
  port: Number(process.env.PORT) || 5002,
  controllers: [new HomeController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
});

app.listen();
