'use client';

import { useState } from 'react';

import { IGetProductPlans } from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import Link from 'next/link';

import { columns } from './_components/table/columns';
import { DataTable } from './_components/table/table';
import { adminProductPlansApi } from '@/src/common/store/services/admin/product/plan';
import PageHeader from '@/src/components/page-header';

export default function AdminProductPlansPage() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    createdAt: false,
    updatedAt: false,
  });

  const getPlans = adminProductPlansApi.useGetProductPlansQuery(
    {
      params: sorting[0] as IGetProductPlans['payload'],
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        title="Plans"
        breadcrumbs={[
          { title: 'Plans', href: '/admin/product/plans' },
          {
            title: 'List',
            href: `/admin/product/plans`,
          },
        ]}
        endContent={
          <Button asChild>
            <Link href="/admin/product/plans/create">New Plan</Link>
          </Button>
        }
      />
      <Card className="border-none">
        <CardContent className="p-0">
          <DataTable
            tableOptions={{
              data: getPlans.data?.data || [],
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
            isLoading={getPlans.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
