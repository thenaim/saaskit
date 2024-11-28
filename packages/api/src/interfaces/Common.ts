import { PlanInterval, Prisma } from '@repo/database/index';
import { z } from 'zod';

export enum ActionStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export type ApiResponseType<D = any> = {
  data: D;
  success: boolean;
  message?: number;
  statusCode?: number;
  errors?: Record<string, z.ZodIssue>;
};

export const SortDirection = Prisma.SortOrder;

export interface SortDescriptor<ID = string> {
  /** The key of the column to sort by. */
  id: ID;
  /** The direction to sort by. */
  desc: boolean;
}

export type VisibilityState<KEYOF_TYPE = string> = Partial<
  Record<keyof KEYOF_TYPE, boolean>
>;

export const PlanIntervalList: { label: string; value: PlanInterval | null }[] =
  [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];
