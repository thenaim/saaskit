import { AuthProvider, Prisma } from '@repo/database/index';
import * as yup from 'yup';

import { ApiResponseType } from '../../interfaces';

export type IOauthProvider = Prisma.ProjectAuthProviderGetPayload<{
  select: {
    id: true;
    name: true;
    provider: true;
    isEnabled: true;
  };
}> &
  Partial<
    Prisma.ProjectAuthProviderGetPayload<{
      select: {
        clientId: true;
        clientSecret: true;
      };
    }>
  >;

export const getOauthProvidersSchema = yup.object({
  id: yup
    .string()
    .oneOf(Object.values(Prisma.ProjectAuthProviderScalarFieldEnum))
    .default('name'),
  desc: yup.boolean().default(false),
});

export type IGetOauthProviders = {
  payload: yup.InferType<typeof getOauthProvidersSchema>;
  response: ApiResponseType<IOauthProvider[]>;
};

export type IGetOauthProviderById = {
  payload: {
    params?: {
      withCredentials?: boolean;
    };
  };
  response: ApiResponseType<IOauthProvider>;
};

export const updateOauthProviderByIdSchema = yup.object({
  isEnabled: yup.boolean().required(),
});
export type IUpdateOauthProviderById = {
  payload: yup.InferType<typeof updateOauthProviderByIdSchema>;
  response: ApiResponseType<IOauthProvider>;
};

export const updatOauthProviderCredentialSchema = {
  [AuthProvider.google]: yup.object({
    clientId: yup.string().required(),
    clientSecret: yup.string().required(),
  }),
  [AuthProvider.facebook]: yup.object({
    clientId: yup.string().required(),
    clientSecret: yup.string().required(),
  }),
};

export type IUpdatOauthProviderCredential = {
  payload: {
    [AuthProvider.google]: yup.InferType<
      (typeof updatOauthProviderCredentialSchema)['google']
    >;
    [AuthProvider.facebook]: yup.InferType<
      (typeof updatOauthProviderCredentialSchema)['facebook']
    >;
  };
  response: ApiResponseType;
};
