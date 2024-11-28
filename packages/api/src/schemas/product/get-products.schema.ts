import { Prisma } from '@repo/database/index';
import { boolean, InferType, object, string } from 'yup';

import { ApiResponseType } from '../../interfaces';

export type IProduct = Prisma.ProductGetPayload<{
  select: {
    id: true;
    name: true;
    slug: true;
    isDefault: true;
    isPopular: true;
    isActive: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export const getProductOneTimesSchema = object({
  id: string()
    .oneOf(Object.values(Prisma.ProductScalarFieldEnum))
    .default('name'),
  desc: boolean().default(false),
});

export type IGetProductOneTimes = {
  payload: InferType<typeof getProductOneTimesSchema>;
  response: ApiResponseType<IProduct[]>;
};

export const getProductSubscriptionsSchema = object({
  id: string()
    .oneOf(Object.values(Prisma.ProductScalarFieldEnum))
    .default('name'),
  desc: boolean().default(false),
});

export type IGetProductSubscriptions = {
  payload: InferType<typeof getProductSubscriptionsSchema>;
  response: ApiResponseType<IProduct[]>;
};
