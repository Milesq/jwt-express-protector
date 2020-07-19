import express from 'express';
import createJWTProtector from './lib';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SECRET) {
  throw new Error('SECRET env var not passed');
}

const app = express();
const jwtProtector = createJWTProtector({
  secret: process.env.SECRET,
  verifyUser({ name }: { name: string }) {
    const isAdmin = name[0] > 'f';

    return {
      name,
      isAdmin,
    };
  },
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/login/:name', (req, res) => {
  const { name } = req.params;

  // @ts-ignore: strictNullChecks
  const token = jwt.sign({ name }, process.env.SECRET);

  res.send({ token });
});

app.get('/secret', jwtProtector, (req, res) => {
  console.log(req.user);
  res.send('Hello, World!');
});

app.listen(8080, console.log.bind(null, 'Server is running'));
