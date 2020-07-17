import * as express from 'express';

const createJWTProtector: express.RequestHandler = (req, res, next) => {
  console.log(req.url);
  next();
};

export default createJWTProtector;
