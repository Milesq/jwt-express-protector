import express from 'express';

function createJWTProtector(options?: any): express.RequestHandler {
  return (req, res, next) => {
    console.log(process.env.SECRET);
    next();
  };
}

export default createJWTProtector;
