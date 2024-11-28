import {
  Project,
  ProjectAnalytics,
  ProjectAuthProvider,
  ProjectEmail,
  ProjectEmailProvider,
  ProjectPayment,
  ProjectPaymentProvider,
  ProjectReCaptcha,
} from '@prisma/client';

export const projectSeed = {
  name: 'Test Project',
  description: 'Test Description',
  supportEmail: 'test@test.test',
  isActive: true,
} as Pick<Project, 'name' | 'description' | 'supportEmail' | 'isActive'>;

export const analyticsSeed = {
  isCookieConsentBarEnabled: false,
  googleTrackingId: null,
  trackingScripts: null,
} as Pick<
  ProjectAnalytics,
  'isCookieConsentBarEnabled' | 'googleTrackingId' | 'trackingScripts'
>;

export const authProvidersSeed = [
  { name: 'Google', provider: 'google' },
] as Pick<ProjectAuthProvider, 'name' | 'provider'>[];

export const emailSeed = {
  defaultEmailProvider: 'smtp',
  defaultEmailFromName: 'TEST',
  defaultEmailFromEmail: 'test@test.test',
} as Pick<
  ProjectEmail,
  'defaultEmailProvider' | 'defaultEmailFromName' | 'defaultEmailFromEmail'
>;

export const emailProvidersSeed = [
  { name: 'Sendgrid', provider: 'sendgrid' },
  { name: 'SMTP', provider: 'smtp' },
] as Pick<ProjectEmailProvider, 'name' | 'provider'>[];

export const paymentSeed = {
  defaultCurrency: 'USD',
  isPaymentProration: true,
} as Pick<ProjectPayment, 'defaultCurrency' | 'isPaymentProration'>;

export const paymentProvidersSeed = [
  { name: 'Paddle', provider: 'paddle' },
] as Pick<ProjectPaymentProvider, 'name' | 'provider'>[];

export const reCaptchaSeed = {
  isReCaptchaEnabled: false,
  reCaptchaApiSiteKey: null,
  reCaptchaApiSiteSecret: null,
} as Pick<
  ProjectReCaptcha,
  'isReCaptchaEnabled' | 'reCaptchaApiSiteKey' | 'reCaptchaApiSiteSecret'
>;
