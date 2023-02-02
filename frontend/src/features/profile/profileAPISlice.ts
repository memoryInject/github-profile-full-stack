import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Profile {
  login: string;
  avatarUrl: string;
  name: string;
  location: string;
  email?: string | void;
  publicRepos: number;
  privateRepos: number;
}

export const profileApiSlice = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
  }),
  endpoints(builder) {
    return {
      fetchUserProfile: builder.query<Profile, boolean | void>({
        query() {
          return '/getUserData';
        },
      }),
    };
  },
});

export const { useFetchUserProfileQuery } = profileApiSlice;
