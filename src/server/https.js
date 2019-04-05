const https = (req, res, next) => {
  const environments = ['production'];
  const status = 302;

  if (environments.indexOf(process.env.NODE_ENV) >= 0) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(status, 'https://' + req.hostname + req.originalUrl);
    } else {
      next();
    }
  } else {
    next();
  }
};

export default https;
