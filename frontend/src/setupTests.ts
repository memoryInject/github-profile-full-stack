// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Repo, RepoData } from './features/repo/repoAPISlice';

interface ProfileResponse {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  name: string;
  location: string;
  email?: string;
  bio: string;
  publicRepos: number;
  privateRepos: number;
}

export const profileData: ProfileResponse = {
  login: 'memoryInject',
  avatarUrl: 'url_to_avatar',
  htmlUrl: 'https://github.com/memoryInject',
  name: 'Mahesh MS',
  location: 'earth',
  email: undefined,
  bio: 'full-stack developer',
  publicRepos: 12,
  privateRepos: 0,
};


const repos: RepoData[] = [
  {
    name: 'project1',
    fullName: 'foo/project1',
    htmlUrl: 'https://github.com/foo/project1',
    description: 'some project',
    private: false,
    language: 'bar',
    followers: 0,
  },
  {
    name: 'project2',
    fullName: 'foo/project2',
    htmlUrl: 'https://github.com/foo/project2',
    description: 'some project',
    private: false,
    language: 'bar',
    followers: 0,
  },
  {
    name: 'project3',
    fullName: 'foo/project3',
    htmlUrl: 'https://github.com/foo/project3',
    description: 'some project',
    private: false,
    language: 'bar',
    followers: 0,
  },
  {
    name: 'project4',
    fullName: 'foo/project4',
    htmlUrl: 'https://github.com/foo/project4',
    description: 'some project',
    private: false,
    language: 'bar',
    followers: 0,
  },
  {
    name: 'project5',
    fullName: 'foo/project5',
    htmlUrl: 'https://github.com/foo/project5',
    description: 'some project',
    private: false,
    language: 'bar',
    followers: 0,
  },
];

export const reposData: Repo = {
  page: 1,
  perPage: 5,
  repos
};

const server = setupServer(
  rest.get<ProfileResponse>('/api/v1/user/profile', (_req, res, ctx) => {
    return res(ctx.json(profileData));
  }),

  rest.get<Repo>('/api/v1/user/repos', (_req, res, ctx) => {
    return res(ctx.json(reposData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
