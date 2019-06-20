import express from 'express';
import bcrypt from 'bcrypt';
import { User } from './auth.model';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { loadDevEnv, isProduction } from 'toronto-utils';
import { isPasswordValid } from 'toronto-utils/lib/validation';

loadDevEnv();
const secret = process.env.SECRET;
const expirationTime = parseInt(process.env.JWT_EXPIRATION_MS);
const router = express.Router();

const setJwtCookie = (res, payload) => {
  const token = jwt.sign(payload, secret, { algorithm: 'HS256' });

  let cookieOptions = {
    expires: new Date(payload.expires)
  };
  if (isProduction()) {
    cookieOptions = { ...cookieOptions, httpOnly: true, secure: true };
  }
  console.log('set jwt cookie');
  res.cookie('jwt', token, cookieOptions);
};
const setLoginCookie = (res, payload) => {
  let cookieOptions = {
    expires: new Date(payload.expires)
  };
  if (isProduction()) {
    cookieOptions = { ...cookieOptions, secure: true };
  }
  console.log('set u cookie');
  res.cookie('u', payload.username, cookieOptions);
};

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashCost = 10;

  const pCheck = isPasswordValid(password);

  if (!pCheck.valid) {
    return res.status(400).send({ pCheck });
  }

  bcrypt
    .hash(password, hashCost)
    .then(passwordHash => {
      User.create({ username, passwordHash }, (err, user) => {
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

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      console.log(error);
      return res.status(400).send({ error });
    }

    const payload = {
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
router.get('/is-user-available', (req, res) => {
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

export default router;
