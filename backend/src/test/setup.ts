import path from 'path';
import * as dotenv from 'dotenv';
import request from 'supertest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import app from '../app';

const configFile = path.join(process.cwd(), '.env.test.local');

dotenv.config({ path: configFile });

interface AccessTokenResponse {
  access_token: string;
}

interface ProfileResponse {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  location: string;
  email?: string;
  bio: string;
  public_repos: number;
  private_repos: number;
}

interface RepoResponse {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  private: boolean;
  language: string;
  watchers: number;
}

export const profileData: ProfileResponse = {
  login: 'memoryInject',
  avatar_url: 'url_to_avatar',
  html_url: 'https://github.com/memoryInject',
  name: 'Mahesh MS',
  location: 'earth',
  email: undefined,
  bio: 'full-stack developer',
  public_repos: 12,
  private_repos: 0,
};

export const reposData: RepoResponse[] = [
  {
    name: 'project1',
    full_name: 'foo/project1',
    html_url: 'https://github.com/foo/project1',
    description: 'some project',
    private: false,
    language: 'bar',
    watchers: 0,
  },
  {
    name: 'project2',
    full_name: 'foo/project2',
    html_url: 'https://github.com/foo/project2',
    description: 'some project',
    private: false,
    language: 'bar',
    watchers: 0,
  },
  {
    name: 'project3',
    full_name: 'foo/project3',
    html_url: 'https://github.com/foo/project3',
    description: 'some project',
    private: false,
    language: 'bar',
    watchers: 0,
  },
  {
    name: 'project4',
    full_name: 'foo/project4',
    html_url: 'https://github.com/foo/project4',
    description: 'some project',
    private: false,
    language: 'bar',
    watchers: 0,
  },
  {
    name: 'project5',
    full_name: 'foo/project5',
    html_url: 'https://github.com/foo/project5',
    description: 'some project',
    private: false,
    language: 'bar',
    watchers: 0,
  },
];

// Setting up a mock server for github
const server = setupServer(
  // server end point for getting access token
  rest.post<Record<string, never>, AccessTokenResponse>(
    'https://github.com/login/oauth/access_token',
    async (_req, res, ctx) => {
      console.log('POST access_token -- worker');

      return res(
        ctx.json({
          access_token: 'asdasdasdasd',
        })
      );
    }
  ),
  // server end point for getting user profile
  rest.get<ProfileResponse>(
    'https://api.github.com/user',
    async (_req, res, ctx) => {
      console.log('GET user profile -- worker');

      return res(ctx.json(profileData));
    }
  ),
  // server end point for getting user repos
  rest.get<RepoResponse[]>(
    'https://api.github.com/user/repos',
    async (_req, res, ctx) => {
      console.log('GET user repos -- worker');

      return res(ctx.json(reposData));
    }
  )
);

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close();
});

declare global {
  function signin(): Promise<string[]>;
}

// Get access token cookie
global.signin = async () => {
  const response = await request(app())
    .get('/api/v1/auth/get-access-token?code=mycode1234')
    .send()
    .expect(200);
  const cookie = response.get('Set-Cookie');
  return cookie;
};
