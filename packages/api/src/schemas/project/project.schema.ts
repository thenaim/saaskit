import { EmailProvider, Prisma, Project } from '@repo/database/index';
import { ApiResponseType } from '../../interfaces';
import * as yup from 'yup';

export type IGetProject = {
  payload: any;
  response: ApiResponseType<
    Prisma.ProjectGetPayload<{
      select: {
        id: true;
        name: true;
        description: true;
        supportEmail: true;
        analytics: {
          select: {
            id: true;
            isCookieConsentBarEnabled: true;
            googleTrackingId: true;
            trackingScripts: true;
          };
        };
        email: {
          select: {
            id: true;
            defaultEmailProvider: true;
            defaultEmailFromName: true;
            defaultEmailFromEmail: true;
          };
        };
        payment: {
          select: {
            id: true;
            defaultCurrency: true;
            isPaymentProration: true;
          };
        };
        reCaptcha: {
          select: {
            id: true;
            isReCaptchaEnabled: true;
            reCaptchaApiSiteKey: true;
            reCaptchaApiSiteSecret: true;
          };
        };
      };
    }>
  >;
};

/**
 * Application
 */
export const updateProjectAplicationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  supportEmail: yup.string().required().email(),
});

export type IUpdateProjectAplication = {
  payload: yup.InferType<typeof updateProjectAplicationSchema>;
  response: IGetProject['response'];
};

/**
 * Payment
 */
export const updateProjectPaymentSchema = yup.object({
  defaultCurrency: yup.string().required(),
  isPaymentProration: yup.boolean().required(),
});

export type IUpdateProjectPayment = {
  payload: yup.InferType<typeof updateProjectPaymentSchema>;
  response: IGetProject['response'];
};

/**
 * Email
 */
export const updateProjectEmailSchema = yup.object({
  defaultEmailProvider: yup
    .string()
    .required()
    .oneOf(Object.values(EmailProvider)),
  defaultEmailFromName: yup.string().required(),
  defaultEmailFromEmail: yup.string().required().email(),
});

export type IUpdateProjectEmail = {
  payload: yup.InferType<typeof updateProjectEmailSchema>;
  response: IGetProject['response'];
};

/**
 * Analytics
 */
export const updateProjectAnalyticsSchema = yup.object({
  isCookieConsentBarEnabled: yup.boolean(),
  googleTrackingId: yup.string().optional(),
  trackingScripts: yup.string().optional(),
});

export type IUpdateProjectAnalytics = {
  payload: yup.InferType<typeof updateProjectAnalyticsSchema>;
  response: IGetProject['response'];
};

/**
 * ReCaptcha
 */
export const updateProjectReCaptchaSchema = yup.object({
  isReCaptchaEnabled: yup.boolean(),
  reCaptchaApiSiteKey: yup.string().optional(),
  reCaptchaApiSiteSecret: yup.string().optional(),
});

export type IUpdateProjectReCaptcha = {
  payload: yup.InferType<typeof updateProjectReCaptchaSchema>;
  response: IGetProject['response'];
};
