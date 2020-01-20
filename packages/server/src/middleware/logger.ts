import { Request, Response } from 'express';

export const loggerMiddleware = (req: Request, resp: Response, next: any) => {
  console.log('Request logged:', req.method, req.path);
  next();
};
