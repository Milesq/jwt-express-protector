import * as express from 'express';
import createJWTProtector from './lib';

const app = express();
const jwtProtector = createJWTProtector();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/secret', jwtProtector, (req, res) => {
  res.send('Hello, World!');
});

app.listen(8080, console.log.bind(null, 'Server is running'));
