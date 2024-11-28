'use client';

import { IOauthProvider } from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { MoreVerticalIcon } from 'lucide-react';
import Link from 'next/link';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps<IOauthProvider>) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="ml-auto flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/admin/settings/oauth-providers/${row.original.id}`}>
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
