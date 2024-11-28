'use client';

import { useState } from 'react';

import { IGetBlogCategories } from '@repo/api';
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
import { adminBlogApi } from '@/src/common/store/services/admin/blog';
import PageHeader from '@/src/components/page-header';

export default function AdminBlogCategoriesPage() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    slug: false,
  });

  const getBlogCategories = adminBlogApi.useGetBlogCategoriesQuery(
    {
      params: sorting[0] as IGetBlogCategories['payload'],
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        title="Blog Post Categories"
        breadcrumbs={[
          { title: 'Blog Post Categories', href: '/admin/blog/categories' },
          {
            title: 'List',
            href: `/admin/blog/categories`,
          },
        ]}
        endContent={
          <Button asChild>
            <Link href="/admin/blog/categories/create">
              New blog post category
            </Link>
          </Button>
        }
      />
      <Card className="border-none">
        <CardContent className="p-0">
          <DataTable
            tableOptions={{
              data: getBlogCategories.data?.data || [],
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
            isLoading={getBlogCategories.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
