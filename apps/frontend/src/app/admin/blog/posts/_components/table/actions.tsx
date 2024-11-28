'use client';

import { useState } from 'react';

import { IBlogPost } from '@repo/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@repo/ui/components/ui/alert-dialog';
import { Button } from '@repo/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { Loader2Icon, MoreVerticalIcon } from 'lucide-react';
import Link from 'next/link';

import { toast } from 'sonner';
import { adminBlogApi } from '@/src/common/store/services/admin/blog';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions({
  row,
}: DataTableRowActionsProps<IBlogPost>) {
  const [isOpen, setIsOpen] = useState(false);

  const [deleteBlogPostCategoryById, deleteBlogPostCategoryByIdResult] =
    adminBlogApi.useDeleteBlogPostByIdMutation();

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete <strong>({row.original.title})</strong> Post
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you would like to do this?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant={'destructive'}
                onClick={async () => {
                  await deleteBlogPostCategoryById(row.original.id);
                  toast('Deleted!');
                }}
              >
                Confirm
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            disabled={deleteBlogPostCategoryByIdResult.isLoading}
            className="ml-auto flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            {deleteBlogPostCategoryByIdResult.isLoading ? (
              <Loader2Icon />
            ) : (
              <MoreVerticalIcon className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild>
            <Link href={`/admin/blog/posts/${row.original.id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={async (e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
