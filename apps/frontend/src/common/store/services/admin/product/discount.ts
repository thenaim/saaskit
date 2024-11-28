// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetProductDiscounts } from '@repo/api';

export const adminProductDiscountsApi = createApi({
  reducerPath: 'adminProductDiscountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/discounts`,
    credentials: 'include',
  }),
  tagTypes: ['AdminProductDiscounts'],
  endpoints: (builder) => ({
    getProductDiscounts: builder.query<
      IGetProductDiscounts['response'],
      {
        params: IGetProductDiscounts['payload'];
      }
    >({
      query: ({ params }) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({ type: 'AdminProductDiscounts', id }))
          : ['AdminProductDiscounts'],
    }),
  }),
});
