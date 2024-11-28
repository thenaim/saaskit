'use client';

import { useState } from 'react';

import { Blog, IGetBlogPosts, VisibilityState } from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { SortingState, ColumnFiltersState } from '@tanstack/react-table';
import Link from 'next/link';

import { columns } from './_components/table/columns';
import { DataTable } from './_components/table/table';
import { adminBlogApi } from '@/src/common/store/services/admin/blog';
import PageHeader from '@/src/components/page-header';

export default function AdminBlogPostsPage() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<
    VisibilityState<Blog>
  >({
    createdAt: false,
  });

  const getBlogPosts = adminBlogApi.useGetBlogPostsQuery(
    {
      params: sorting[0] as IGetBlogPosts['payload'],
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        title="Blog Posts"
        breadcrumbs={[
          { title: 'Blog Posts', href: '/admin/blog/posts' },
          {
            title: 'List',
            href: `/admin/blog/posts`,
          },
        ]}
        endContent={
          <Button asChild>
            <Link href="/admin/blog/posts/create">New blog post</Link>
          </Button>
        }
      />
      <Card className="border-none">
        <CardContent className="p-0">
          <DataTable
            tableOptions={{
              data: getBlogPosts.data?.data || [],
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
            isLoading={getBlogPosts.isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
