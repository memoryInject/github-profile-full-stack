import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RepoData {
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  private: boolean;
  language: void | string;
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
      fetchUserRepo: builder.query<Repo[], boolean | void>({
        query() {
          return '/getUserRepo';
        },
      }),
    };
  },
});

export const { useFetchUserRepoQuery } = repoApiSlice;
