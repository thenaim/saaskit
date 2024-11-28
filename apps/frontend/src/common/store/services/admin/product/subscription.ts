// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICreateProductSubscription,
  IGetProductSubscriptions,
  IUpdateProductSubscription,
} from '@repo/api';

export const adminProductSubscriptionsApi = createApi({
  reducerPath: 'adminProductSubscriptionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/subscriptions`,
    credentials: 'include',
  }),
  tagTypes: ['AdminProductSubscriptions'],
  endpoints: (builder) => ({
    getProductSubscriptions: builder.query<
      IGetProductSubscriptions['response'],
      {
        params: IGetProductSubscriptions['payload'];
      }
    >({
      query: ({ params }) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({
              type: 'AdminProductSubscriptions',
              id,
            }))
          : ['AdminProductSubscriptions'],
    }),
    createProductSubscription: builder.mutation<
      ICreateProductSubscription['response'],
      ICreateProductSubscription['payload']
    >({
      query: (body) => ({
        url: `create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => ['AdminProductSubscriptions'],
    }),
    updateProductSubscription: builder.mutation<
      IUpdateProductSubscription['response'],
      {
        id: string;
        body: IUpdateProductSubscription['payload'];
      }
    >({
      query: ({ id, body }) => ({
        url: `${id}/update`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => ['AdminProductSubscriptions'],
    }),
  }),
});
