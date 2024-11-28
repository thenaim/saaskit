'use client';

import { useState } from 'react';

import { IGetProductOneTimes } from '@repo/api';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

import { columns } from './_components/table/columns';
import { DataTable } from './_components/table/table';
import { adminProductOneTimesApi } from '@/src/common/store/services/admin/product';
import PageHeader from '@/src/components/page-header';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';

export default function AdminProductOneTimesPage() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    slug: false,
  });

  const getDiscounts = adminProductOneTimesApi.useGetProductOneTimesQuery(
    {
      params: sorting[0] as IGetProductOneTimes['payload'],
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        title="One-time Purchase Products"
        breadcrumbs={[
          {
            title: 'One-time Purchase Products',
            href: '/admin/product/one-times',
          },
          {
            title: 'List',
            href: `/admin/product/one-times`,
          },
        ]}
        endContent={
          <Button asChild>
            <Link href="/admin/product/one-times/create">
              New One-time Purchase Product
            </Link>
          </Button>
        }
      />
      <Card className="border-none">
        <CardContent className="p-0">
          <DataTable
            tableOptions={{
              data: getDiscounts.data?.data || [],
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
            isLoading={getDiscounts.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
