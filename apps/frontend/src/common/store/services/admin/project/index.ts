// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IGetProject,
  IUpdateProjectAnalytics,
  IUpdateProjectAplication,
  IUpdateProjectEmail,
  IUpdateProjectPayment,
  IUpdateProjectReCaptcha,
} from '@repo/api';
import { merge } from 'lodash';

export const adminProjectApi = createApi({
  reducerPath: 'adminProjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/project`,
    credentials: 'include',
  }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getProject: builder.query<IGetProject['response'], unknown>({
      query: () => ({ url: ``, method: 'GET' }),
      providesTags: (result) => ['Project'],
    }),
    updateProjectAplication: builder.mutation<
      IUpdateProjectAplication['response'],
      IUpdateProjectAplication['payload']
    >({
      query: (body) => ({ url: `/application/update`, method: 'POST', body }),
      async onQueryStarted(patch, { dispatch, queryFulfilled }) {
        try {
          const updated = await queryFulfilled;
          const patchResult = dispatch(
            adminProjectApi.util.updateQueryData(
              'getProject',
              undefined,
              (draft) => merge(draft, updated.data),
            ),
          );
        } catch {}
      },
    }),
    updateProjectPayment: builder.mutation<
      IUpdateProjectPayment['response'],
      IUpdateProjectPayment['payload']
    >({
      query: (body) => ({ url: `/payment/update`, method: 'POST', body }),
      invalidatesTags: ['Project'],
    }),
    updateProjectEmail: builder.mutation<
      IUpdateProjectEmail['response'],
      IUpdateProjectEmail['payload']
    >({
      query: (body) => ({ url: `/email/update`, method: 'POST', body }),
      invalidatesTags: ['Project'],
    }),
    updateProjectAnalytics: builder.mutation<
      IUpdateProjectAnalytics['response'],
      IUpdateProjectAnalytics['payload']
    >({
      query: (body) => ({ url: `/analytics/update`, method: 'POST', body }),
      invalidatesTags: ['Project'],
    }),
    updateProjectReCaptcha: builder.mutation<
      IUpdateProjectReCaptcha['response'],
      IUpdateProjectReCaptcha['payload']
    >({
      query: (body) => ({ url: `/recaptcha/update`, method: 'POST', body }),
      invalidatesTags: ['Project'],
    }),
  }),
});
