import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface RepoData {
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  private: boolean;
  language: string;
  followers: number;
}

interface Repo {
  page: number;
  perPage: number;
  repos: RepoData[];
}

export const repoApiSlice = createApi({
  reducerPath: 'repoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
  }),
  endpoints(builder) {
    return {
      fetchUserRepo: builder.query<Repo, number | void>({
        query(page = 1) {
          return `/repo?page=${page}`;
        },
      }),
    };
  },
});

export const { useFetchUserRepoQuery } = repoApiSlice;
