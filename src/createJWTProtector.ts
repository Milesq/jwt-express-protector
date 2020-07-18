import * as express from 'express';

function createJWTProtector(options?: any): express.RequestHandler {
  return (req, res, next) => {
    next();
  };
}

export default createJWTProtector;
