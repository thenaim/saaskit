// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IGetPaymentProviderById,
  IGetPaymentProviders,
  IUpdatPaymentProviderCredential,
  IUpdatePaymentProviderById,
} from '@repo/api';

export const adminPaymentProviderApi = createApi({
  reducerPath: 'adminPaymentProviderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/providers`,
    credentials: 'include',
  }),
  tagTypes: ['AdminPaymentProviders'],
  endpoints: (builder) => ({
    getPaymentProviders: builder.query<
      IGetPaymentProviders['response'],
      { params: IGetPaymentProviders['payload'] }
    >({
      query: ({ params }) => ({ url: ``, method: 'GET', params }),
      providesTags: (result) =>
        result?.data
          ? result.data.map(({ id }) => ({ type: 'AdminPaymentProviders', id }))
          : ['AdminPaymentProviders'],
    }),
    getPaymentProviderById: builder.query<
      IGetPaymentProviderById['response'],
      { id: string } & IGetPaymentProviderById['payload']
    >({
      query: ({ id, params }) => ({ url: `/${id}`, method: 'GET', params }),
      providesTags: (result, error, { id }) => [
        { type: 'AdminPaymentProviders', id },
      ],
    }),
    updatePaymentProviderById: builder.mutation<
      IUpdatePaymentProviderById['response'],
      {
        id: string;
        body: IUpdatePaymentProviderById['payload'];
      }
    >({
      query: ({ id, body }) => ({ url: `/${id}/update`, method: 'POST', body }),
    }),
    updatePaymentProviderCredentialById: builder.mutation<
      IUpdatPaymentProviderCredential['response'],
      {
        id: string;
        body: IUpdatPaymentProviderCredential['payload'][keyof IUpdatPaymentProviderCredential['payload']];
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
