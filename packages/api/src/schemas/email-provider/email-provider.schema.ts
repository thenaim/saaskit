import { EmailProvider, Prisma } from '@repo/database/index';
import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export type IEmailProvider = Prisma.ProjectEmailProviderGetPayload<{
  select: {
    id: true;
    name: true;
    provider: true;
  };
}> &
  Partial<
    Prisma.ProjectEmailProviderGetPayload<{
      select: {
        domain: true;
        secret: true;
        endpoint: true;
        token: true;
        key: true;
        region: true;
        host: true;
        port: true;
        username: true;
        password: true;
      };
    }>
  >;

export const getEmailProvidersSchema = yup.object({
  id: yup
    .string()
    .oneOf(Object.values(Prisma.ProjectEmailProviderScalarFieldEnum))
    .default('name'),
  desc: yup.boolean().default(false),
});

export type IGetEmailProviders = {
  payload: yup.InferType<typeof getEmailProvidersSchema>;
  response: ApiResponseType<IEmailProvider[]>;
};

export type IGetEmailProviderById = {
  payload: {
    params?: {
      withCredentials?: boolean;
    };
  };
  response: ApiResponseType<IEmailProvider>;
};

export const updateEmailProviderByIdSchema = yup.object({
  name: yup.string().max(10).required(),
});
export type IUpdateEmailProviderById = {
  payload: yup.InferType<typeof updateEmailProviderByIdSchema>;
  response: ApiResponseType<IEmailProvider>;
};

export const testEmailProviderByIdSchema = yup.object({
  email: yup.string().required().email(),
  subject: yup.string().required(),
  body: yup.string().required(),
});
export type ITestEmailProviderById = {
  payload: yup.InferType<typeof testEmailProviderByIdSchema>;
  response: ApiResponseType;
};

export const updatEmailProviderCredentialSchema = {
  [EmailProvider.smtp]: yup.object({
    host: yup.string(),
    port: yup.string(),
    username: yup.string(),
    password: yup.string(),
  }),
  [EmailProvider.sendgrid]: yup.object({
    key: yup.string().required(),
  }),
};

export type IUpdatEmailProviderCredential = {
  payload: {
    [EmailProvider.smtp]: yup.InferType<
      (typeof updatEmailProviderCredentialSchema)['smtp']
    >;
    [EmailProvider.sendgrid]: yup.InferType<
      (typeof updatEmailProviderCredentialSchema)['sendgrid']
    >;
  };
  response: ApiResponseType;
};
