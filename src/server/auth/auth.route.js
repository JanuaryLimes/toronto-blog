import express from 'express';
import bcrypt from 'bcrypt';
import { User } from './auth.model';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { loadDevEnv, isProduction } from '../utils';

loadDevEnv();
const secret = process.env.SECRET;
const expirationTime = parseInt(process.env.JWT_EXPIRATION_MS);
const router = express.Router();

router.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const hashCost = 10;

  bcrypt
    .hash(password, hashCost)
    .then(passwordHash => {
      User.create({ username, passwordHash }, (err, user) => {
        if (err) {
          return res.status(400).send({ err });
        }
        return res.status(200).send({ username });
      });
    })
    .catch(hashError => {
      return res.status(400).send({
        error: 'req body should take form { username, passport }'
      });
    });
});

router.post('/api/login', (req, res) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(400).send({ error });
    }

    const payload = {
      username: user,
      expires: Date.now() + expirationTime
    };

    req.login(payload, { session: false }, error => {
      if (error) {
        res.status(400).send({ error });
      }

      const token = jwt.sign(payload, secret, { algorithm: 'HS256' });

      let cookieOptions = {
        expires: new Date(payload.expires)
      };
      if (isProduction()) {
        cookieOptions = { ...cookieOptions, httpOnly: true, secure: true };
      }

      res.cookie('jwt', token, cookieOptions);
      res.status(200).send({ user: payload.username });
    });
  })(req, res);
});

export default router;
