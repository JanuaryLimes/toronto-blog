import jwt from 'jsonwebtoken';
import { env } from '@toronto-blog/utils';

const secret = env().SECRET;

export function getUserFromRequestJwt(req) {
  const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  };

  let decoded;
  const token = cookieExtractor(req);
  if (token) {
    try {
      decoded = jwt.verify(token, secret);
    } catch (error) {}
  }

  if (decoded && decoded.username) {
    return decoded.username;
  }
  return null;
}
