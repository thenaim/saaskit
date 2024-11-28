'use client';

import { useState } from 'react';

import { IGetProductDiscounts } from '@repo/api';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

import { columns } from './_components/table/columns';
import { DataTable } from './_components/table/table';
import { adminProductDiscountsApi } from '@/src/common/store/services/admin/product/discount';
import PageHeader from '@/src/components/page-header';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';

export default function AdminProductDiscountsPage() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    slug: false,
  });

  const getDiscounts = adminProductDiscountsApi.useGetProductDiscountsQuery(
    {
      params: sorting[0] as IGetProductDiscounts['payload'],
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        title="Discounts"
        breadcrumbs={[
          { title: 'Discounts', href: '/admin/product/discounts' },
          {
            title: 'List',
            href: `/admin/product/discounts`,
          },
        ]}
        endContent={
          <Button asChild>
            <Link href="/admin/product/discounts/create">New Discount</Link>
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
