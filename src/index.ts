import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import api from './api';

// init express
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(
    cookieSession({
      name: 'session',
      keys: ['secret'],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
);

app.get('/', (req, res) => {
  res.send({msg: 'Hello World!'});
});

// api routes
app.use('/api', api);


app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
