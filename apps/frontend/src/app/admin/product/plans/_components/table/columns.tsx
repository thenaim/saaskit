'use client';

import { IProductPlan } from '@repo/api';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from './header';
import { DataTableViewOptions } from './view-options';

const columnHelper = createColumnHelper<IProductPlan>();

export const columns = [
  columnHelper.accessor((item) => item.name, {
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (info) => {
      return (
        <div className="flex space-x-2 pl-3">
          <Link
            href={`/admin/settings/email-providers/${info.row.original.id}`}
          >
            {info.getValue()}
          </Link>
        </div>
      );
    },
    enableHiding: false,
  }),
  columnHelper.accessor((item) => item.slug, {
    id: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: (info) => {
      return <div className="flex space-x-2 pl-3">{info.getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor((item) => item.productId, {
    id: 'productId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: (info) => {
      return (
        <div className="flex space-x-2 pl-3">
          {info.row.original?.product?.name}
        </div>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((item) => item.interval, {
    id: 'interval',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interval" />
    ),
    cell: (info) => {
      return <div className="flex space-x-2 pl-3">{info.getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor((item) => item.trialInterval, {
    id: 'trialInterval',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trial" />
    ),
    cell: (info) => {
      return <div className="flex space-x-2 pl-3">{info.getValue()}</div>;
    },
    enableSorting: false,
  }),
  columnHelper.accessor((item) => item.isActive, {
    id: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is active" />
    ),
    cell: (info) => {
      return (
        <div className="flex space-x-2 pl-3">
          {info.getValue() ? (
            <CheckCircleIcon className="text-green-400" />
          ) : (
            <XCircleIcon className="text-red-400" />
          )}
        </div>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((item) => item.createdAt, {
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
  columnHelper.accessor((item) => item.updatedAt, {
    id: 'updatedAt',
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
