// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICreateBlogCategory,
  ICreateBlogPost,
  IDeleteBlogCategoryById,
  IDeleteBlogPostById,
  IGetBlogCategories,
  IGetBlogCategoriesList,
  IGetBlogCategoryById,
  IGetBlogPostById,
  IGetBlogPosts,
  IUpdateBlogCategoryById,
  IUpdateBlogPostById,
} from '@repo/api';

export const adminBlogApi = createApi({
  reducerPath: 'adminBlogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog`,
    credentials: 'include',
  }),
  tagTypes: ['Posts', 'Categories'],
  endpoints: (builder) => ({
    getBlogPosts: builder.query<
      IGetBlogPosts['response'],
      { params: IGetBlogPosts['payload'] }
    >({
      query: ({ params }) => ({ url: `/posts`, method: 'GET', params }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({ type: 'Posts', id }))
          : ['Posts'],
    }),
    createBlogPost: builder.mutation<
      ICreateBlogPost['response'],
      ICreateBlogPost['payload']
    >({
      query: (body) => ({ url: `/posts/create`, method: 'POST', body }),
      invalidatesTags: ['Posts'],
    }),
    getBlogPostById: builder.query<IGetBlogPostById['response'], string>({
      query: (id) => ({ url: `/posts/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    updateBlogPostById: builder.mutation<
      IUpdateBlogPostById['response'],
      {
        id: string;
        body: IUpdateBlogPostById['payload'];
      }
    >({
      query: ({ id, body }) => ({ url: `/posts/${id}`, method: 'POST', body }),
      invalidatesTags: ['Posts'],
    }),
    deleteBlogPostById: builder.mutation<
      IDeleteBlogPostById['response'],
      string
    >({
      query: (id) => ({
        url: `/posts/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    getBlogCategories: builder.query<
      IGetBlogCategories['response'],
      { params: IGetBlogCategories['payload'] }
    >({
      query: ({ params }) => ({ url: `/categories`, method: 'GET', params }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({ type: 'Categories', id }))
          : ['Categories'],
    }),
    getBlogCategoriesList: builder.query<
      IGetBlogCategoriesList['response'],
      void
    >({
      query: () => ({
        url: `/categories/list`,
        method: 'GET',
      }),
    }),
    createBlogCategory: builder.mutation<
      ICreateBlogCategory['response'],
      ICreateBlogCategory['payload']
    >({
      query: (body) => ({ url: `/categories/create`, method: 'POST', body }),
      invalidatesTags: ['Categories'],
    }),
    getBlogCategoryById: builder.query<
      IGetBlogCategoryById['response'],
      string
    >({
      query: (id: string) => ({ url: `/categories/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Categories', id }],
    }),
    updateBlogCategoryById: builder.mutation<
      IUpdateBlogCategoryById['response'],
      {
        id: string;
        body: IUpdateBlogCategoryById['payload'];
      }
    >({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteBlogCategoryById: builder.mutation<
      IDeleteBlogCategoryById['response'],
      string
    >({
      query: (id) => ({
        url: `/categories/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});
