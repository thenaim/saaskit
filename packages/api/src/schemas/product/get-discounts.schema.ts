import { Prisma } from '@repo/database/index';
import { boolean, InferType, object, string } from 'yup';

import { ApiResponseType } from '../../interfaces';

export type IProductDiscount = Prisma.DiscountGetPayload<{
  select: {
    id: true;
    name: true;
    type: true;
    amount: true;
    isActive: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
export const getProductDiscountsSchema = object({
  id: string()
    .oneOf(Object.values(Prisma.DiscountScalarFieldEnum))
    .default('name'),
  desc: boolean().default(false),
});

export type IGetProductDiscounts = {
  payload: InferType<typeof getProductDiscountsSchema>;
  response: ApiResponseType<IProductDiscount[]>;
};
