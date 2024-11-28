'use client';

import { useState } from 'react';

import { IGetOauthProviders } from '@repo/api';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

import { columns } from './_components/table/columns';
import { DataTable } from './_components/table/table';
import { adminOauthProviderApi } from '@/src/common/store/services/admin/oauth-provider';
import PageHeader from '@/src/components/page-header';

export default function AdminOauthProvidersPage() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    slug: false,
  });

  const getOauthProviders = adminOauthProviderApi.useGetOauthProvidersQuery(
    {
      params: sorting[0] as IGetOauthProviders['payload'],
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        title="Oauth Providers"
        breadcrumbs={[
          { title: 'Oauth Providers', href: '/admin/settings/oauth-providers' },
          {
            title: 'List',
            href: `/admin/settings/oauth-providers`,
          },
        ]}
      />
      <Card className="border-none">
        <CardContent className="p-0">
          <DataTable
            tableOptions={{
              data: getOauthProviders.data?.data || [],
              columns,
              state: {
                sorting,
                columnFilters,
                columnVisibility,
              },
              onSortingChange: setSorting,
              onColumnFiltersChange: setColumnFilters,
              onColumnVisibilityChange: setColumnVisibility,
            }}
            isLoading={getOauthProviders.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
