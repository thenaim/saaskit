import { PaymentProvider, Prisma } from '@repo/database/index';
import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export type IPaymentProvider = Prisma.ProjectPaymentProviderGetPayload<{
  select: {
    id: true;
    name: true;
    provider: true;
    isActive: true;
  };
}> &
  Partial<
    Prisma.ProjectPaymentProviderGetPayload<{
      select: {
        verndorId: true;
        clientSideToken: true;
        vendorAuthCode: true;
        webhookSecret: true;
      };
    }>
  >;

export const getPaymentProvidersSchema = yup.object({
  id: yup
    .string()
    .oneOf(Object.values(Prisma.ProjectPaymentProviderScalarFieldEnum))
    .default('name'),
  desc: yup.boolean().default(false),
});

export type IGetPaymentProviders = {
  payload: yup.InferType<typeof getPaymentProvidersSchema>;
  response: ApiResponseType<IPaymentProvider[]>;
};

export type IGetPaymentProviderById = {
  payload: {
    params?: {
      withCredentials?: boolean;
    };
  };
  response: ApiResponseType<IPaymentProvider>;
};

export const updatePaymentProviderByIdSchema = yup.object({
  isActive: yup.boolean().required(),
});
export type IUpdatePaymentProviderById = {
  payload: yup.InferType<typeof updatePaymentProviderByIdSchema>;
  response: ApiResponseType<IPaymentProvider>;
};

export const testPaymentProviderByIdSchema = yup.object({
  email: yup.string().required().email(),
  subject: yup.string().required(),
  body: yup.string().required(),
});
export type ITestPaymentProviderById = {
  payload: yup.InferType<typeof testPaymentProviderByIdSchema>;
  response: ApiResponseType;
};

export const updatPaymentProviderCredentialSchema = {
  [PaymentProvider.paddle]: yup.object({
    verndorId: yup.string(),
    clientSideToken: yup.string(),
    vendorAuthCode: yup.string(),
    webhookSecret: yup.string(),
  }),
  [PaymentProvider.stripe]: yup.object(),
};

export type IUpdatPaymentProviderCredential = {
  payload: {
    [PaymentProvider.paddle]: yup.InferType<
      (typeof updatPaymentProviderCredentialSchema)['paddle']
    >;
    [PaymentProvider.stripe]: yup.InferType<
      (typeof updatPaymentProviderCredentialSchema)['stripe']
    >;
  };
  response: ApiResponseType;
};
