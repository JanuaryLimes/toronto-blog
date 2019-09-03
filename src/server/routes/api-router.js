import express from 'express';
import passport from 'passport';

import blogRouter from './blog';
import blogPostRouter from './blog-post';
import authRouter from '../auth/auth.route';
import dashboardRouter from './dashboard';

const passportJwtAuthentication = passport.authenticate('jwt', {
  session: false
});
const apiRouter = express.Router();
const secureRouter = express.Router();
const publicRouter = express.Router();

// /api/auth/...
apiRouter.use('/auth', authRouter);
// /api/secure/...
apiRouter.use('/secure', passportJwtAuthentication, secureRouter);
// /api/public/...
apiRouter.use('/public', publicRouter);

secureRouter.use('/dashboard', dashboardRouter);

publicRouter.use('/blogs', blogRouter);
publicRouter.use('/blog-post', blogPostRouter);

export default apiRouter;
