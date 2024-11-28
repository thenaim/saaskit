// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IGetEmailProviderById,
  IGetEmailProviders,
  ITestEmailProviderById,
  IUpdatEmailProviderCredential,
  IUpdateEmailProviderById,
} from '@repo/api';

export const adminEmailProviderApi = createApi({
  reducerPath: 'adminEmailProviderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/email/providers`,
    credentials: 'include',
  }),
  tagTypes: ['AdminEmailProviders'],
  endpoints: (builder) => ({
    getEmailProviders: builder.query<
      IGetEmailProviders['response'],
      {
        params: IGetEmailProviders['payload'];
      }
    >({
      query: ({ params }) => ({ url: ``, method: 'GET', params }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({ type: 'AdminEmailProviders', id }))
          : ['AdminEmailProviders'],
    }),
    getEmailProviderById: builder.query<
      IGetEmailProviderById['response'],
      { id: string } & IGetEmailProviderById['payload']
    >({
      query: ({ id, params }) => ({ url: `/${id}`, method: 'GET', params }),
      providesTags: (result, error, { id }) => [
        { type: 'AdminEmailProviders', id },
      ],
    }),
    updateEmailProviderById: builder.mutation<
      IUpdateEmailProviderById['response'],
      {
        id: string;
        body: IUpdateEmailProviderById['payload'];
      }
    >({
      query: ({ id, body }) => ({ url: `/${id}/update`, method: 'POST', body }),
    }),
    testEmailProviderById: builder.mutation<
      ITestEmailProviderById['response'],
      {
        id: string;
        body: ITestEmailProviderById['payload'];
      }
    >({
      query: ({ id, body }) => ({
        url: `/${id}/test`,
        method: 'POST',
        body,
      }),
    }),
    updateEmailProviderCredentialById: builder.mutation<
      IUpdatEmailProviderCredential['response'],
      {
        id: string;
        body: IUpdatEmailProviderCredential['payload'][keyof IUpdatEmailProviderCredential['payload']];
      }
    >({
      query: ({ id, body }) => ({
        url: `/${id}/credentials/update`,
        method: 'POST',
        body,
      }),
    }),
  }),
});
