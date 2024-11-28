// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetUsersList } from '@repo/api';

export const adminUserApi = createApi({
  reducerPath: 'adminUserApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
    credentials: 'include',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsersList: builder.query<IGetUsersList['response'], void>({
      query: () => ({ url: `/list`, method: 'GET' }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({ type: 'Users', id }))
          : ['Users'],
    }),
  }),
});
