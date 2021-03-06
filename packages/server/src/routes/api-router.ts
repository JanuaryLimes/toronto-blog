import express from 'express';
import passport from 'passport';

import { blogRouter } from './blog';
import { blogPostRouter } from './blog-post';
import { authRouter } from '../auth/auth.route';
import { dashboardRouter } from './dashboard';
import { topBlogsRouter } from './top-blogs.route';

const passportJwtAuthentication = passport.authenticate('jwt', {
  session: false
});
export const apiRouter = express.Router();
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
publicRouter.use('/top-blogs', topBlogsRouter);
