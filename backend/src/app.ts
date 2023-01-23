import express, { Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import cors from 'cors';

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

  app.get('/', (_req: Request, res: Response) => {
    res.send({ msg: 'hello world!' });
  });

  return app;
};
