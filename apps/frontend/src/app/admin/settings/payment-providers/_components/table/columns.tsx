'use client';

import { IPaymentProvider } from '@repo/api';
import { createColumnHelper } from '@tanstack/react-table';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from './header';
import { DataTableViewOptions } from './view-options';

const columnHelper = createColumnHelper<IPaymentProvider>();

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
            {info.getValue() as unknown as string}
          </Link>
        </div>
      );
    },
    enableHiding: false,
  }),
  columnHelper.accessor((item) => item.provider, {
    id: 'provider',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: (info) => {
      return <div className="flex space-x-2 pl-3">{info.getValue()}</div>;
    },
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
  }),
  columnHelper.display({
    id: 'actions',
    header: (ctx) => <DataTableViewOptions table={ctx.table} />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
];
