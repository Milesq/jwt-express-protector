import express from 'express';
import jwt from 'jsonwebtoken';

interface ProtectorOptions {
  secret: string;
  verifyUser?: (payload: object | string) => object | string;
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

function createJWTProtector(options: ProtectorOptions): express.RequestHandler {
  return (req, res, next) => {
    const token = req.get('Authorization')?.split(' ').last();
    const _401 = () => res.status(401).send('401 UNAUTHORIZED');

    if (!token) {
      _401();
      return;
    }

    try {
      const payload = jwt.verify(token, options?.secret);
      req.user = options?.verifyUser ? options.verifyUser(payload) : payload;
      next();
    } catch {
      _401();
    }
  };
}

export default createJWTProtector;
