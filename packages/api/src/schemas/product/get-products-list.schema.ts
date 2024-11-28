import { Prisma, ProductType } from '@repo/database/index';
import { InferType, object, string } from 'yup';

import { ApiResponseType } from '../../interfaces';

export const getProductsListSchema = object({
  type: string().oneOf(Object.values(ProductType)).default('onetime'),
});

export type IGetProductsList = {
  payload: InferType<typeof getProductsListSchema>;
  response: ApiResponseType<
    Prisma.ProductGetPayload<{
      select: {
        id: true;
        name: true;
      };
    }>[]
  >;
};
