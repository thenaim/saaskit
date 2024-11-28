import { Product } from '@repo/database/index';
import { InferType } from 'yup';

import {
  createProductOneTimeSchema,
  createProductSubscriptionSchema,
} from './create-product.schema';
import { ApiResponseType } from '../../interfaces';

export type IUpdateProductOneTime = {
  payload: InferType<typeof createProductOneTimeSchema>;
  response: ApiResponseType<Omit<Product, 'type'>>;
};

export type IUpdateProductSubscription = {
  payload: InferType<typeof createProductSubscriptionSchema>;
  response: ApiResponseType<Omit<Product, 'type'>>;
};
