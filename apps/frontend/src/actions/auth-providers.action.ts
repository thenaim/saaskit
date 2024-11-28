'use server';

import { IOauthProvider } from '@repo/api';

export const getAuthProvidersAction = async (): Promise<
  Pick<IOauthProvider, 'name' | 'provider'>[]
> => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/oauth-providers`,
    {
      cache: 'no-cache',
    },
  )
    .then((res) => res.json())
    .then((res) => res?.data || [])
    .catch(() => []);
};
