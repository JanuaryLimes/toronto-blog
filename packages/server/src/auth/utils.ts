import jwt from 'jsonwebtoken';
import { env } from '@toronto-blog/utils';
import { Request } from 'express';

const secret = env().SECRET;

export function getUserFromRequestJwt(req: Request) {
  const cookieExtractor = function(req: Request) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  };

  const token = cookieExtractor(req);
  if (token) {
    try {
      let decoded: any = jwt.verify(token, secret);
      if (decoded && decoded.username) {
        return decoded.username;
      }
    } catch (error) {}
  }

  return null;
}
