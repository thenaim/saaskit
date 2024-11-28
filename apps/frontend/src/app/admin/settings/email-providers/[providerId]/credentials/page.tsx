'use client';

import { useCallback, useMemo } from 'react';

import { EmailProvider } from '@repo/api';
import { useParams } from 'next/navigation';

import SENDGRIDEmailProviderCredentials from './SENDGRID';
import SMTPEmailProviderCredentials from './SMTP';
import { adminEmailProviderApi } from '@/src/common/store/services/admin/email-provider';
import PageHeader from '@/src/components/page-header';

export default function AdminEmailProviderCredentialsPage() {
  const params = useParams();

  const getProvider = adminEmailProviderApi.useGetEmailProviderByIdQuery(
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
              title: 'Email Providers',
              href: '/admin/settings/email-providers',
            },
            {
              title: getProvider.data.data.name,
              href: `/admin/settings/email-providers/${getProvider.data.data.id}`,
            },
            {
              title: 'Credentials',
              href: `/admin/settings/email-providers/${getProvider.data.data.id}/credentials`,
            },
          ]
        : [
            {
              title: 'Email Providers',
              href: '/admin/settings/email-providers',
            },
          ],
    [getProvider.data],
  );

  const CredentialsFormByProvider = useCallback(() => {
    if (!getProvider.data?.data) {
      return;
    }
    switch (getProvider.data.data.provider) {
      case EmailProvider.smtp:
        return <SMTPEmailProviderCredentials data={getProvider.data.data} />;
      case EmailProvider.sendgrid:
        return (
          <SENDGRIDEmailProviderCredentials data={getProvider.data.data} />
        );
    }
  }, [getProvider]);

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Edit Email Provider Credentials"
      />
      <CredentialsFormByProvider />
    </div>
  );
}
