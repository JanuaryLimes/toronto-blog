import * as express from 'express';
import { Request, Response } from 'express';
import { IControllerBase } from 'types';

export class HomeController implements IControllerBase {
  public path = '/home';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.index);
  }

  index = (req: Request, res: Response) => {
    const users = [
      {
        id: 1,
        name: 'Ali'
      },
      {
        id: 2,
        name: 'Can'
      },
      {
        id: 3,
        name: 'Ahmet'
      },
      {
        id: 4,
        name: 'elo000'
      }
    ];

    res.status(200).json(users);
  };
}
