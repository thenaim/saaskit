// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IForgotPassword,
  IResetPassword,
  ISignIn,
  ISignUpConfirm,
  ISignUp,
} from '@repo/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
    credentials: 'include',
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    me: builder.query({
      query: () => ({ url: `/me`, method: 'GET' }),
      providesTags: [{ type: 'auth', id: 'USER' }],
    }),
    signIn: builder.mutation<ISignIn['response'], ISignIn['payload']>({
      query: (body) => ({ url: `/signin`, method: 'POST', body }),
      // onQueryStarted: async (arg, api) => {
      //   const result = await api.queryFulfilled;
      //   api.dispatch(authSlice.actions.user(result.data.data));
      // },
    }),
    signUp: builder.mutation<ISignUp['response'], ISignUp['payload']>({
      query: (body) => ({ url: `/signup`, method: 'POST', body }),
    }),
    signOut: builder.mutation({
      query: (body) => ({ url: `/signout`, method: 'POST', body }),
    }),
    signUpConfirm: builder.mutation<
      ISignUpConfirm['response'],
      ISignUpConfirm['payload']
    >({
      query: (body) => ({ url: `/signout`, method: 'POST', body }),
    }),
    forgotPassword: builder.mutation<
      IForgotPassword['response'],
      IForgotPassword['payload']
    >({
      query: (body) => ({ url: `/signout`, method: 'POST', body }),
    }),
    resetPassword: builder.mutation<
      IResetPassword['response'],
      IResetPassword['payload']
    >({
      query: (body) => ({ url: `/signout`, method: 'POST', body }),
    }),
  }),
});
