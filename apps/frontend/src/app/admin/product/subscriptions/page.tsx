'use client';

import { useState } from 'react';

import { IGetProductSubscriptions } from '@repo/api';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

import { columns } from './_components/table/columns';
import { DataTable } from './_components/table/table';
import { adminProductSubscriptionsApi } from '@/src/common/store/services/admin/product/subscription';
import PageHeader from '@/src/components/page-header';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';

export default function AdminProductSubscriptionsPage() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    createdAt: false,
    updatedAt: false,
  });

  const getSubscriptions =
    adminProductSubscriptionsApi.useGetProductSubscriptionsQuery(
      {
        params: sorting[0] as IGetProductSubscriptions['payload'],
      },
      {
        refetchOnMountOrArgChange: true,
      },
    );

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        title="Subscription Products"
        breadcrumbs={[
          {
            title: 'Subscription Products',
            href: '/admin/product/subscriptions',
          },
          {
            title: 'List',
            href: `/admin/product/subscriptions`,
          },
        ]}
        endContent={
          <Button asChild>
            <Link href="/admin/product/subscriptions/create">
              New Subscription Product
            </Link>
          </Button>
        }
      />
      <Card className="border-none">
        <CardContent className="p-0">
          <DataTable
            tableOptions={{
              data: getSubscriptions.data?.data || [],
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
            isLoading={getSubscriptions.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
