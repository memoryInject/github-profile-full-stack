import express, { Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import cors from 'cors';
import axios from 'axios';

export default () => {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors());
  }

  app.use(express.json());
  app.use(express.static('public'));
  app.use(
    cookieSession({
      signed: false,
      secure: process.env.NODE_ENV === 'production',
    })
  );

  // Get access token
  app.get('/api/v1/getAccessToken', async (req: Request, res: Response) => {
    console.log(req.query.code);

    if (req.session && req.session.access_token) {
      console.log('access_token', req.session.access_token);
      return res.send({ access: true });
    }

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const params = `?client_id=${clientId}&client_secret=${clientSecret}&code=${req.query.code}`;

    const { data } = await axios.post(
      'https://github.com/login/oauth/access_token' + params,
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    console.log(data);
    if (req.session && data.access_token) {
      req.session.access_token = data.access_token;
    }
    res.send({ access: true });
  });

  // Get userdata
  app.get('/api/v1/getUserData', async (req: Request, res: Response) => {
    if (req.session && req.session.access_token) {
      const { data } = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: 'Bearer ' + req.session.access_token,
        },
      });

      console.log(data);
      res.send(data);
    }

    res.status(400).send({});
  });

  app.get('/api/v1/', (_req: Request, res: Response) => {
    res.send({ access: true });
  });

  return app;
};
