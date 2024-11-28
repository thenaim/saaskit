import { Plan, PlanInterval } from '@repo/database/index';
import { boolean, InferType, number, object, string } from 'yup';

import { ApiResponseType } from '../../interfaces';

export const createPlanSchema = object({
  name: string().required(),
  slug: string().optional(),
  productId: string().required(),
  intervalCount: number().required(),
  interval: string().oneOf(Object.values(PlanInterval)).required(),
  isHasTrial: boolean().default(false),
  trialIntervalCount: number().when('isHasTrial', {
    is: true,
    then: (schema) => schema.required(),
  }),
  trialInterval: string().when('isHasTrial', {
    is: true,
    then: (schema) => schema.required().oneOf(Object.values(PlanInterval)),
  }),
  isActive: boolean().default(false),
  description: string().optional(),
});

export type ICreatePlan = {
  payload: InferType<typeof createPlanSchema>;
  response: ApiResponseType<Plan>;
};
