import * as express from 'express';

function createJWTProtector(options?: any): express.RequestHandler {
  return (req, res, next) => {
    console.log(req.url);
    next();
  };
}

export default createJWTProtector;
