import { getReposKey } from '../keys';
import { client, REDIS_TTL } from '../redis/client';
import { Repo } from '../types';

export const createRepos = async (
  sessionId: string,
  page: number,
  repos: Repo[]
) => {
  const reposKey = getReposKey(sessionId, page);
  const reposData = JSON.stringify(repos);

  await client.set(reposKey, reposData, { EX: REDIS_TTL });
};

export const retrieveRepos = async (sessionId: string, page: number) => {
  const reposKey = getReposKey(sessionId, page);
  const repos = await client.get(reposKey);

  if (repos) {
    return JSON.parse(repos);
  }
  return repos;
};
