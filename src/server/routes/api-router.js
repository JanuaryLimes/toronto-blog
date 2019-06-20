import express from 'express';
import passport from 'passport';

import blogRoute from './blog';
import authRoute from '../auth/auth.route';
import dashboardRouter from './dashboard';

const passportJwtAuthentication = passport.authenticate('jwt', {
  session: false
});
const apiRouter = express.Router();
const secureRouter = express.Router();
const publicRouter = express.Router();

// /api/auth/...
apiRouter.use('/auth', authRoute);
// /api/secure/...
apiRouter.use('/secure', passportJwtAuthentication, secureRouter);
// /api/public/...
apiRouter.use('/public', publicRouter);

secureRouter.use('/dashboard', dashboardRouter);

publicRouter.use('/blogs', blogRoute);

export default apiRouter;
