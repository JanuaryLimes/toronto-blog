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
router.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashCost = 10;

  try {
    const passwordHash = await bcrypt.hash(password, hashCost);

    User.create({ username, passwordHash })
      .then(value => {
        console.log('value', value);
        res.status(200).send({ username });
      })
      .catch(error => {
        console.log('error', error);
        res.status(400).send({ error });
      });
  } catch (error) {
    res.status(400).send({
      error: 'req body should take form { username, passport }'
    });
  }
});

router.post('/api/login', (req, res) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      res.status(400).json({ error });
    }

    const payload = {
      username: user.username,
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
