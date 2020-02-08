import express, { CookieOptions, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from './auth.model';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ENV, isProduction, isPasswordValid } from '@toronto-blog/utils';
import { AuthPayload } from 'types';

const secret = ENV.SECRET;
const expirationTime = parseInt(ENV.JWT_EXPIRATION_MS);
export const authRouter = express.Router();

const setJwtCookie = (res: Response, payload: AuthPayload) => {
  const token = jwt.sign(payload, secret, { algorithm: 'HS256' });

  let cookieOptions: CookieOptions = {
    expires: new Date(payload.expires)
  };
  if (isProduction()) {
    cookieOptions = { ...cookieOptions, httpOnly: true, secure: true };
  }
  console.log('set jwt cookie');
  res.cookie('jwt', token, cookieOptions);
};
const setLoginCookie = (res: Response, payload: AuthPayload) => {
  let cookieOptions: CookieOptions = {
    expires: new Date(payload.expires)
  };
  if (isProduction()) {
    cookieOptions = { ...cookieOptions, secure: true };
  }
  console.log('set u cookie');
  res.cookie('u', payload.username, cookieOptions);
};

authRouter.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashCost = 10;

  const pCheck = isPasswordValid(password);

  if (!pCheck.valid) {
    return res.status(400).send({ pCheck });
  }

  bcrypt
    .hash(password, hashCost)
    .then(passwordHash => {
      User.create({ username, passwordHash }, (err: any, user: any) => {
        if (err) {
          return res.status(400).send({ err });
        }

        const payload = {
          username: user.username,
          expires: Date.now() + expirationTime
        };
        req.login(payload, { session: false }, error => {
          if (error) {
            return res.status(400).send({ error });
          }

          setJwtCookie(res, payload);
          setLoginCookie(res, payload);
          return res.status(200).send({ user: payload.username });
        });
      });
    })
    .catch(_hashError => {
      return res.status(400).send({
        error: 'req body should take form { username, passport }'
      });
    });
});

authRouter.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      console.log(error);
      return res.status(400).send({ error });
    }

    const payload: AuthPayload = {
      username: user,
      expires: Date.now() + expirationTime
    };

    req.login(payload, { session: false }, error => {
      if (error) {
        console.log(error);
        return res.status(400).send({ error });
      }

      setJwtCookie(res, payload);
      setLoginCookie(res, payload);
      return res.status(200).send({ user: payload.username });
    });
  })(req, res);
});

// /api/auth/is-user-available?user=...
authRouter.get('/is-user-available', (req, res) => {
  const inputUser = req.query.user;

  console.log(req.query);

  if (inputUser) {
    User.find({ username: inputUser }, (err, docs) => {
      if (err) {
        return res.status(400).send({ error: err });
      } else {
        if (docs && docs.length === 0) {
          console.log('usernameAvailable: true');
          return res
            .status(200)
            .send({ usernameAvailable: true, username: inputUser });
        } else {
          console.log('usernameAvailable: false');
          return res
            .status(200)
            .send({ usernameAvailable: false, username: inputUser });
        }
      }
    });
  } else {
    return res.status(400).send({ error: 'Empty user' });
  }
});

authRouter.post('/logout', (req, res) => {
  console.log('logout success');

  let options: CookieOptions = { expires: new Date(Date.now() - 300000) };
  if (isProduction()) {
    options = { ...options, httpOnly: true, secure: true };
  }
  res.cookie('jwt', '', options);
  res.cookie('u', '', options);

  return res.status(200).send();
});
