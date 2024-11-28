// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetProductPlans } from '@repo/api';

export const adminProductPlansApi = createApi({
  reducerPath: 'adminProductPlans',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/plans`,
    credentials: 'include',
  }),
  tagTypes: ['AdminProductPlans'],
  endpoints: (builder) => ({
    getProductPlans: builder.query<
      IGetProductPlans['response'],
      {
        params: IGetProductPlans['payload'];
      }
    >({
      query: ({ params }) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({ type: 'AdminProductPlans', id }))
          : ['AdminProductPlans'],
    }),
  }),
});
