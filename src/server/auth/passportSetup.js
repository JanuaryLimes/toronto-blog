import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import { User } from './auth.model';
import bcrypt from 'bcrypt';
import { loadDevEnv } from '../utils';

loadDevEnv();
const secret = process.env.SECRET;

passport.use(
  new passportLocal.Strategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err || !user) {
        return done(err || 'Incorrect Username / Password');
      }

      bcrypt
        .compare(password, user.passwordHash)
        .then(passwordsMatch => {
          if (passwordsMatch) {
            return done(null, user.username);
          } else {
            return done('Incorrect Username / Password');
          }
        })
        .catch(compareError => {
          return done(compareError);
        });
    });
  })
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
