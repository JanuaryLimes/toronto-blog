import { isProduction } from './utils';

const https = (req, res, next) => {
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
