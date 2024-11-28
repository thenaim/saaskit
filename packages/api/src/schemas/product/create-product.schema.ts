import { Product } from '@repo/database/index';
import { array, boolean, InferType, object, string } from 'yup';

import { ApiResponseType } from '../../interfaces';

export const createProductOneTimeSchema = object({
  name: string().required(),
  slug: string().optional(),
  description: string().optional(),
  isActive: boolean().default(true),
  metadata: array(
    object({
      key: string().required(),
      value: string().required(),
    }),
  ).default([]),
  features: array(
    object({
      value: string().required(),
    }),
  ).default([]),
});

export type ICreateProductOneTime = {
  payload: InferType<typeof createProductOneTimeSchema>;
  response: ApiResponseType<Omit<Product, 'type'>>;
};

export const createProductSubscriptionSchema = object({
  name: string().required(),
  slug: string().optional(),
  description: string().optional(),
  isPopular: boolean().default(false),
  isDefault: boolean().default(false),
  metadata: array(
    object({
      key: string().required(),
      value: string().required(),
    }),
  ).default([]),
  features: array(
    object({
      value: string().required(),
    }),
  ).default([]),
});

export type ICreateProductSubscription = {
  payload: InferType<typeof createProductSubscriptionSchema>;
  response: ApiResponseType<Omit<Product, 'type'>>;
};
