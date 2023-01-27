import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Access {
  access: boolean;
}

export const apiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
  }),
  endpoints(builder) {
    return {
      fetchAccess: builder.query<Access, string>({
        query(code) {
          return `/getAccessToken?code=${code}`;
        },
      }),
    };
  },
});

export const { useFetchAccessQuery } = apiSlice;
