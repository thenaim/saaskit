import { combineReducers } from '@reduxjs/toolkit';

import { adminBlogApi } from './services/admin/blog';
import { adminEmailProviderApi } from './services/admin/email-provider';
import { adminOauthProviderApi } from './services/admin/oauth-provider';
import { adminPaymentProviderApi } from './services/admin/payment-provider';
import {
  adminProductApi,
  adminProductOneTimesApi,
} from './services/admin/product';
import { adminProductDiscountsApi } from './services/admin/product/discount';
import { adminProductPlansApi } from './services/admin/product/plan';
import { adminProductSubscriptionsApi } from './services/admin/product/subscription';
import { adminProjectApi } from './services/admin/project';
import { adminUserApi } from './services/admin/user';
import { authApi } from './services/auth';
import { authSlice } from './slices/auth';

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [adminBlogApi.reducerPath]: adminBlogApi.reducer,
  [adminUserApi.reducerPath]: adminUserApi.reducer,
  [adminProjectApi.reducerPath]: adminProjectApi.reducer,
  [adminEmailProviderApi.reducerPath]: adminEmailProviderApi.reducer,
  [adminOauthProviderApi.reducerPath]: adminOauthProviderApi.reducer,
  [adminPaymentProviderApi.reducerPath]: adminPaymentProviderApi.reducer,
  [adminProductApi.reducerPath]: adminProductApi.reducer,
  [adminProductSubscriptionsApi.reducerPath]:
    adminProductSubscriptionsApi.reducer,
  [adminProductPlansApi.reducerPath]: adminProductPlansApi.reducer,
  [adminProductDiscountsApi.reducerPath]: adminProductDiscountsApi.reducer,
  [adminProductOneTimesApi.reducerPath]: adminProductOneTimesApi.reducer,
});
