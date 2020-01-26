import { isProduction } from '@toronto-blog/utils';
import { Request, Response, NextFunction } from 'express';

const https = (req: Request, res: Response, next: NextFunction) => {
  const status = 302;
  const makeHttpsRedirect = () => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(status, 'https://' + req.hostname + req.originalUrl);
    } else {
      next();
    }
  };

  if (isProduction()) {
    makeHttpsRedirect();
  } else {
    next();
  }
};

export default https;
