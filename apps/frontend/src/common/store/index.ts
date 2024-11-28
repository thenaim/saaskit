import {
  configureStore,
  Middleware,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';

import { rootReducer } from './reducers';
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

const errorMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    // console.log('action', action);
    // if (isRejected(action)) {
    //   if ((action.payload as unknown as any)?.status === 401) {
    //     window?.location.replace(
    //       `/auth/signin?redirect=${window.location.pathname}`,
    //     );
    //   }
    // }

    return next(action);
  };

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        adminBlogApi.middleware,
        adminUserApi.middleware,
        adminProjectApi.middleware,
        adminEmailProviderApi.middleware,
        adminOauthProviderApi.middleware,
        adminPaymentProviderApi.middleware,
        adminProductApi.middleware,
        adminProductSubscriptionsApi.middleware,
        adminProductPlansApi.middleware,
        adminProductDiscountsApi.middleware,
        adminProductOneTimesApi.middleware,
        errorMiddleware,
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
