import { Prisma } from '@repo/database/index';
import { boolean, InferType, object, string } from 'yup';

import { ApiResponseType } from '../../interfaces';

export type IProductPlan = Prisma.PlanGetPayload<{
  select: {
    id: true;
    name: true;
    slug: true;
    productId: true;
    product: {
      select: {
        name: true;
      };
    };
    interval: true;
    intervalCount: true;
    trialInterval: true;
    trialIntervalCount: true;
    isActive: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export const getProductPlansSchema = object({
  id: string().oneOf(Object.values(Prisma.PlanScalarFieldEnum)).default('name'),
  desc: boolean().default(false),
});

export type IGetProductPlans = {
  payload: InferType<typeof getProductPlansSchema>;
  response: ApiResponseType<IProductPlan[]>;
};

export type IGetProductPlansList = {
  payload: any;
  response: ApiResponseType<
    Prisma.PlanGetPayload<{
      select: {
        id: true;
        name: true;
      };
    }>[]
  >;
};
