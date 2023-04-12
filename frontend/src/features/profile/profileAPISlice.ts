import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Profile {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  name: string;
  location: string;
  email?: string | void;
  bio?: string | void;
  publicRepos: number;
  privateRepos: number;
}

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/user',
  }),
  endpoints(builder) {
    return {
      fetchUserProfile: builder.query<Profile, boolean | void>({
        query() {
          return '/profile';
        },
      }),
    };
  },
});

export const { useFetchUserProfileQuery } = profileApiSlice;
