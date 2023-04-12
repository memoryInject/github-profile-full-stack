import express, { Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { authRouter } from './routes/auth-route';
import { userRouter } from './routes/user-route';

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

  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);

  app.get('/api/v1/ping', (_req: Request, res: Response) => {
    res.send({ msg: 'pong' });
  });

  return app;
};
