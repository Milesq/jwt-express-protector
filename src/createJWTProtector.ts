import express from 'express';
import jwt from 'jsonwebtoken';
import './utils';
import { PromiseVal } from './utils';

interface ProtectorOptions {
  secret: string;
  verifyUser?: (payload: object | string) => PromiseVal<object | string>;
}

function createJWTProtector(options: ProtectorOptions): express.RequestHandler {
  return async (req, res, next) => {
    const token = req.get('Authorization')?.split(' ').last();
    const _401 = () => res.status(401).send('401 UNAUTHORIZED');

    if (!token) {
      _401();
      return;
    }

    try {
      const payload = jwt.verify(token, options?.secret);
      if (options.verifyUser) {
        req.user = await options.verifyUser(payload);
      } else {
        req.user = payload;
      }

      next();
    } catch {
      _401();
    }
  };
}

export default createJWTProtector;
