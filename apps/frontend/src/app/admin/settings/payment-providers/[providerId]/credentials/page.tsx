'use client';

import { useCallback, useMemo } from 'react';

import { PaymentProvider } from '@repo/api';
import { useParams } from 'next/navigation';

import PaddlePaymentProviderCredentials from './PADDLE';
import { adminPaymentProviderApi } from '@/src/common/store/services/admin/payment-provider';
import PageHeader from '@/src/components/page-header';

export default function AdminPaymentProviderCredentialsPage() {
  const params = useParams();

  const getProvider = adminPaymentProviderApi.useGetPaymentProviderByIdQuery(
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
    () => [
      {
        title: 'Payment Providers',
        href: '/admin/settings/payment-providers',
      },
      {
        title: getProvider.data?.data?.name || '...',
        href: `/admin/settings/payment-providers/${getProvider.data?.data?.id}`,
      },
      {
        title: 'Credentials',
        href: `/admin/settings/payment-providers/${getProvider.data?.data?.id}/credentials`,
      },
    ],
    [getProvider.data],
  );

  const CredentialsFormByProvider = useCallback(() => {
    if (!getProvider.data?.data) {
      return;
    }
    switch (getProvider.data.data.provider) {
      case PaymentProvider.paddle:
        return (
          <PaddlePaymentProviderCredentials data={getProvider.data.data} />
        );
    }
  }, [getProvider]);

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Edit Payment Provider Credentials"
      />
      <CredentialsFormByProvider />
    </div>
  );
}
