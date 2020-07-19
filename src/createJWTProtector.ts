import express from 'express';
import jwt from 'jsonwebtoken';

interface ProtectorOptions {
  secret: string;
  verifyUser?: (payload: object | string) => object;
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

function createJWTProtector(
  options?: ProtectorOptions
): express.RequestHandler {
  if (!process.env.SECRET) {
    throw new Error('SECRET env var not passed');
  }

  return (req, res, next) => {
    const token = req.get('Authorization')?.split(' ').last();
    const _401 = () => res.status(401).send('401 UNAUTHORIZED');

    if (!token) {
      _401();
      return;
    }

    try {
      // @ts-ignore: strictNullChecks
      const payload = jwt.verify(token, process.env.SECRET);
      req.user = options?.verifyUser?.(payload);
      next();
    } catch {
      _401();
    }
  };
}

export default createJWTProtector;
