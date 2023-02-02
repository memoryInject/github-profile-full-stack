import express, { Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import cors from 'cors';
import axios from 'axios';

interface Profile {
  login: string;
  avatarUrl: string;
  name: string;
  location: string;
  email?: string | void;
  publicRepos: number;
  privateRepos: number;
}

interface Repo {
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  private: boolean;
  language: void | string;
  followers: number;
}

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

      const userProfile: Profile = {
        login: data.login,
        avatarUrl: data.avatar_url,
        name: data.name,
        location: data.location,
        email: data.email,
        publicRepos: data.public_repos,
        privateRepos: data.total_private_repos,
      };

      console.log(userProfile);
      return res.send(userProfile);
    }

    res.status(400).send({ success: false });
  });

  app.get('/api/v1/', (_req: Request, res: Response) => {
    res.send({ access: true });
  });

  // Get user-repos
  app.get('/api/v1/getUserRepo', async (req: Request, res: Response) => {
    if (req.session && req.session.access_token) {
      const { data } = await axios.get(
        'https://api.github.com/user/repos?per_page=2&page=1',
        {
          headers: {
            Authorization: 'Bearer ' + req.session.access_token,
          },
        }
      );

      // console.log(data);
      const repos: Repo[] = data.map((repo: any) => {
        return {
          name: repo.name,
          fullName: repo.full_name,
          htmlUrl: repo.html_url,
          description: repo.description,
          private: repo.private,
          language: repo.language,
          followers: repo.watchers,
        };
      });

      console.log(repos);
      return res.send({ page: 1, perPage: 5, repos });
    }

    res.status(400).send({ success: false });
  });

  app.get('/api/v1/', (_req: Request, res: Response) => {
    res.send({ access: true });
  });

  return app;
};
