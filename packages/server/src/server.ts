import { App } from './app';
import * as bodyParser from 'body-parser';
import { loggerMiddleware } from './middleware/logger';
import { HomeController } from './controllers/home.controller';
import { multiply } from '@toronto-blog/utils';

const app = new App({
  port: Number(process.env.PORT) || 5002,
  controllers: [new HomeController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
});

console.log('multiply test: ', multiply(2, 6));

app.listen();
