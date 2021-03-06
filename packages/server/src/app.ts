import express from 'express';
import { Application } from 'express';
import { join } from 'path';
import { apiRouter } from './routes/api-router';

export class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
    this.template();
    this.react();
  }

  private react() {
    if (process.env.NODE_ENV == 'production') {
      // Serve the static files from the React app
      this.app.use(express.static(join(__dirname, '../../client/build')));
      this.app.get('*', (req, res) => {
        // Handles any requests that don't match the ones above
        res.sendFile(join(__dirname, '../../client/build/index.html'));
      });
    }
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach(controller => {
      this.app.use('/api', controller.router);
    });
    this.app.use('/api', apiRouter);
  }

  private assets() {
    //this.app.use(express.static('public'));
    //this.app.use(express.static('views'));
  }

  private template() {
    //this.app.set('view engine', 'pug');
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
