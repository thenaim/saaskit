import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionStatus, AuthState } from '@repo/api';

import { authMeThunk, authSignInThunk } from './thunks';
import { RootState } from '../..';

const initialState = {
  user: null,
  status: ActionStatus.IDLE,
} satisfies AuthState as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    user: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(authSignInThunk.pending, (state) => {
        state.status = ActionStatus.PENDING;
      })
      .addCase(authSignInThunk.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.status = ActionStatus.FULFILLED;
      })
      .addCase(authSignInThunk.rejected, (state) => {
        state.status = ActionStatus.REJECTED;
      })
      .addCase(authMeThunk.pending, (state) => {
        state.status = ActionStatus.PENDING;
      })
      .addCase(authMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = ActionStatus.FULFILLED;
      })
      .addCase(authMeThunk.rejected, (state) => {
        state.status = ActionStatus.REJECTED;
      });
  },
});

export const selectAuthSlice = (state: RootState) => state.auth;

export default authSlice;