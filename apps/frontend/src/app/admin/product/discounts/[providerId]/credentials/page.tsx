'use client';

import { useCallback, useMemo } from 'react';

import { AuthProvider } from '@repo/api';
import { useParams } from 'next/navigation';

import FacebookOauthProviderCredentials from './FACEBOOK';
import GoogleOauthProviderCredentials from './GOOGLE';
import { adminOauthProviderApi } from '@/src/common/store/services/admin/oauth-provider';
import PageHeader from '@/src/components/page-header';

export default function AdminOauthProviderCredentialsPage() {
  const params = useParams();

  const getProvider = adminOauthProviderApi.useGetOauthProviderByIdQuery(
    {
      id: params?.providerId as string,
      params: {
        withCredentials: true,
      },
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const breadcrumbs = useMemo(
    () =>
      getProvider.data
        ? [
            {
              title: 'Oauth Providers',
              href: '/admin/settings/oauth-providers',
            },
            {
              title: getProvider.data.data.name,
              href: `/admin/settings/oauth-providers/${getProvider.data.data.id}`,
            },
            {
              title: 'Credentials',
              href: `/admin/settings/oauth-providers/${getProvider.data.data.id}/credentials`,
            },
          ]
        : [
            {
              title: 'Oauth Providers',
              href: '/admin/settings/oauth-providers',
            },
          ],
    [getProvider.data],
  );

  const CredentialsFormByProvider = useCallback(() => {
    if (!getProvider.data?.data) {
      return;
    }
    switch (getProvider.data.data.provider) {
      case AuthProvider.google:
        return <GoogleOauthProviderCredentials data={getProvider.data.data} />;
      case AuthProvider.facebook:
        return (
          <FacebookOauthProviderCredentials data={getProvider.data.data} />
        );
    }
  }, [getProvider]);

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Edit Oauth Provider Credentials"
      />
      <CredentialsFormByProvider />
    </div>
  );
}
