import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetProduct, IGetProductsList } from '@repo/api';

export const adminProductApi = createApi({
  reducerPath: 'adminProductApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`,
    credentials: 'include',
  }),
  tagTypes: ['ProductList'],
  endpoints: (builder) => ({
    getProductsList: builder.query<IGetProductsList['response'], void>({
      query: () => ({
        url: 'list',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({ type: 'ProductList', id }))
          : ['ProductList'],
    }),
    getProductById: builder.query<IGetProduct['response'], { id: string }>({
      query: ({ id }) => ({
        url: `${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export * from './discount';
export * from './one-time';
export * from './plan';
export * from './subscription';
