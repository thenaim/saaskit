import { createSelector } from '@reduxjs/toolkit';

import { selectAuthSlice } from '.';

export const selectUser = createSelector(
  selectAuthSlice,
  (state) => state.user,
);

export const selectAuthLoadingStatus = createSelector(
  selectAuthSlice,
  (state) => state.status,
);
