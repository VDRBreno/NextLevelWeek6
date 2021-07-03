import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authToken = req.headers.authorization;

  if(!authToken) {
    return res.sendStatus(401);
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.PUBLIC_JWT_TOKEN) as IPayload;

    req.user_id = sub;

    return next();
  } catch(err) {
    return res.sendStatus(401);
  }

  return next();

}