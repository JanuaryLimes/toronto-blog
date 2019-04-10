import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import { User } from './auth.model';
import bcrypt from 'bcrypt';
import { loadDevEnv } from '../utils';

loadDevEnv();
const secret = process.env.SECRET;

passport.use(
  new passportLocal.Strategy(
    // {
    //   usernameField: 'username',
    //   passwordField: 'password'
    // },
    async (username, password, done) => {
      try {
        const userDocument = await User.findOne({ username: username }).exec();
        const passwordsMatch = await bcrypt.compare(
          password,
          userDocument.passwordHash
        );

        if (passwordsMatch) {
          return done(null, userDocument);
        } else {
          return done('Incorrect Username / Password');
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest: req => req.cookies.jwt,
      secretOrKey: secret
    },
    (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
      }

      return done(null, jwtPayload.username);
    }
  )
);
