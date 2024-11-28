'use client';

import { IBlogPost } from '@repo/api';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Link from 'next/link';

import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from './header';
import { DataTableViewOptions } from './view-options';

const columnHelper = createColumnHelper<IBlogPost>();

export const columns = [
  columnHelper.accessor((item) => item.title, {
    id: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: (info) => {
      return (
        <div className="flex space-x-2 pl-3">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={`/admin/blog/posts/${info.row.original.id}`}>
              {info.getValue()}
            </Link>
          </span>
        </div>
      );
    },
    enableHiding: false,
  }),
  columnHelper.accessor((item) => item.categotyId!, {
    id: 'categotyId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: (info) => {
      return (
        <div className="flex space-x-2 pl-3">
          {info.row.original.categoty?.name}
        </div>
      );
    },
  }),
  columnHelper.accessor((item) => item.userId!, {
    id: 'userId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: (info) => {
      return (
        <div className="flex space-x-2 pl-3">
          {info.row.original.user?.name}
        </div>
      );
    },
  }),
  columnHelper.accessor((item) => item.createdAt as unknown as string, {
    id: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: (info) => {
      return (
        <div className="flex space-x-2 pl-3">
          {dayjs(info.getValue()).format('DD-MM-YYYY hh:mm a')}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: (ctx) => <DataTableViewOptions table={ctx.table} />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
];
