import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Client {
  clientId: string;
}

interface Access {
  access: boolean;
}

interface Logout {
  success: boolean;
}

export const apiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/auth',
  }),
  endpoints(builder) {
    return {
      fetchClient: builder.query<Client, boolean | void>({
        query() {
          return '/client-id';
        },
      }),
      fetchAccess: builder.query<Access, string>({
        query(code) {
          return `/get-access-token?code=${code}`;
        },
      }),
      logout: builder.query<Logout, void>({
        query() {
          return '/logout';
        },
      }),
    };
  },
});

export const { useFetchClientQuery, useFetchAccessQuery, useLogoutQuery } =
  apiSlice;
