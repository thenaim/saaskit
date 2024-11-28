import {
  IForgotPassword,
  IResetPassword,
  ISignIn,
  ISignUpConfirm,
  ISignUp,
} from '@repo/api';
import axios, { AxiosResponse } from 'axios';

import { createAppAsyncThunk } from '../../hooks';

export const authSignInThunk = createAppAsyncThunk(
  '[AUTH] Sign In',
  async (
    payload: ISignIn['payload'],
    { dispatch, getState, rejectWithValue, fulfillWithValue },
  ) => {
    return axios
      .request<ISignIn['payload'], AxiosResponse<ISignIn['response']>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        method: 'POST',
        data: payload,
        withCredentials: true,
      })
      .then((res) => fulfillWithValue(res.data))
      .catch(rejectWithValue);
  },
);

export const authSignUpThunk = createAppAsyncThunk(
  '[AUTH] Sign Up',
  async (
    payload: ISignUp['payload'],
    { dispatch, getState, rejectWithValue, fulfillWithValue },
  ) => {
    return axios
      .request<ISignUp['payload'], AxiosResponse<ISignUp['response']>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        method: 'POST',
        data: payload,
        withCredentials: true,
      })
      .then((res) => fulfillWithValue(res.data))
      .catch(rejectWithValue);
  },
);

export const authSignOutThunk = createAppAsyncThunk(
  '[AUTH] Sign Out',
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    return axios
      .request({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/signout`,
        method: 'POST',
        withCredentials: true,
      })
      .then((res) => fulfillWithValue(res.data))
      .catch(rejectWithValue);
  },
);

export const authSignUpConfirmThunk = createAppAsyncThunk(
  '[AUTH] Sign Up Confirm',
  async (
    payload: ISignUpConfirm['payload'],
    { dispatch, getState, rejectWithValue, fulfillWithValue },
  ) => {
    return axios
      .request<
        ISignUpConfirm['payload'],
        AxiosResponse<ISignUpConfirm['response']>
      >({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm`,
        method: 'POST',
        data: payload,
        withCredentials: true,
      })
      .then((res) => fulfillWithValue(res.data))
      .catch(rejectWithValue);
  },
);

export const authForgotPasswordThunk = createAppAsyncThunk(
  '[AUTH] Forgot Password',
  async (
    payload: IForgotPassword['payload'],
    { dispatch, getState, rejectWithValue, fulfillWithValue },
  ) => {
    return axios
      .request<
        IForgotPassword['payload'],
        AxiosResponse<IForgotPassword['response']>
      >({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        method: 'POST',
        data: payload,
        withCredentials: true,
      })
      .then((res) => fulfillWithValue(res.data))
      .catch(rejectWithValue);
  },
);

export const authResetPasswordThunk = createAppAsyncThunk(
  '[AUTH] Reset Password',
  async (
    payload: IResetPassword['payload'],
    { dispatch, getState, rejectWithValue, fulfillWithValue },
  ) => {
    return axios
      .request<
        IResetPassword['payload'],
        AxiosResponse<IResetPassword['response']>
      >({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        method: 'POST',
        data: payload,
        withCredentials: true,
      })
      .then((res) => fulfillWithValue(res.data))
      .catch(rejectWithValue);
  },
);

export const authMeThunk = createAppAsyncThunk(
  '[AUTH] Me',
  async (
    _payload,
    { dispatch, getState, rejectWithValue, fulfillWithValue },
  ) => {
    return axios
      .request<void, AxiosResponse<null>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        method: 'GET',
        withCredentials: true,
      })
      .then((res) => fulfillWithValue(res.data))
      .catch(rejectWithValue);
  },
);
