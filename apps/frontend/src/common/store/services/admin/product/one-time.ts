// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICreateProductOneTime,
  IGetProductOneTimes,
  IUpdateProductOneTime,
} from '@repo/api';

export const adminProductOneTimesApi = createApi({
  reducerPath: 'adminProductOneTimesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/one-times`,
    credentials: 'include',
  }),
  tagTypes: ['AdminProductOneTimes'],
  endpoints: (builder) => ({
    getProductOneTimes: builder.query<
      IGetProductOneTimes['response'],
      {
        params: IGetProductOneTimes['payload'];
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
              type: 'AdminProductOneTimes',
              id,
            }))
          : ['AdminProductOneTimes'],
    }),
    createProductOneTime: builder.mutation<
      ICreateProductOneTime['response'],
      ICreateProductOneTime['payload']
    >({
      query: (body) => ({
        url: `create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => ['AdminProductOneTimes'],
    }),
    updateProductOneTime: builder.mutation<
      IUpdateProductOneTime['response'],
      {
        id: string;
        body: IUpdateProductOneTime['payload'];
      }
    >({
      query: ({ id, body }) => ({
        url: `${id}/update`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => ['AdminProductOneTimes'],
    }),
  }),
});
