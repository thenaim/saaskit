import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import type { AppDispatch, RootState, AppStore } from '.';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
