// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IGetOauthProviderById,
  IGetOauthProviders,
  IUpdatOauthProviderCredential,
  IUpdateOauthProviderById,
} from '@repo/api';

export const adminOauthProviderApi = createApi({
  reducerPath: 'adminOauthProviderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/oauth/providers`,
    credentials: 'include',
  }),
  tagTypes: ['AdminOauthProviders'],
  endpoints: (builder) => ({
    getOauthProviders: builder.query<
      IGetOauthProviders['response'],
      {
        params: IGetOauthProviders['payload'];
      }
    >({
      query: ({ params }) => ({
        url: ``,
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({ type: 'AdminOauthProviders', id }))
          : ['AdminOauthProviders'],
    }),
    getOauthProviderById: builder.query<
      IGetOauthProviderById['response'],
      { id: string } & IGetOauthProviderById['payload']
    >({
      query: ({ id, params }) => ({ url: `/${id}`, method: 'GET', params }),
      providesTags: (result, error, { id }) => [
        { type: 'AdminOauthProviders', id },
      ],
    }),
    updateOauthProviderById: builder.mutation<
      IUpdateOauthProviderById['response'],
      {
        id: string;
        body: IUpdateOauthProviderById['payload'];
      }
    >({
      query: ({ id, body }) => ({ url: `/${id}/update`, method: 'POST', body }),
    }),
    updateOauthProviderCredentialById: builder.mutation<
      IUpdatOauthProviderCredential['response'],
      {
        id: string;
        body: IUpdatOauthProviderCredential['payload'][keyof IUpdatOauthProviderCredential['payload']];
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
