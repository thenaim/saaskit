import { Discount, DiscountType } from '@repo/database/index';
import { array, boolean, date, InferType, number, object, string } from 'yup';

import { ApiResponseType } from '../../interfaces';

export const createDiscountSchema = object({
  name: string().required(),
  description: string().optional(),
  type: string().oneOf(Object.values(DiscountType)).required(),
  amount: number().required(),
  validUntil: date(),
  plans: array(string().required()).required(),
  oneTimeProducts: array(string().required()).required(),
  maxRedemptions: number().required().default(-1),
  maxRedemptionsPerUser: number().required().default(-1),
  isRecurring: boolean().default(false),
  isActive: boolean().default(true),
  durationInMonths: number(),
  maximumRecurringIntervals: number(),
});

export type ICreateDiscount = {
  payload: InferType<typeof createDiscountSchema>;
  response: ApiResponseType<Discount>;
};
