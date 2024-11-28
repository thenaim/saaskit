import { IBlogPost } from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<IBlogPost, string>) {
  if (column.getCanHide() || column.getCanSort()) {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 data-[state=open]:bg-accent"
          onClick={() => column.getCanSort() && column.toggleSorting()}
        >
          <span>{title}</span>
          {column.getCanSort() && (
            <>
              {column.getIsSorted() === 'desc' ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'asc' ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDownIcon className="ml-2 h-4 w-4" />
              )}
            </>
          )}
        </Button>
      </div>
    );
  }

  return <div className={cn(className)}>{title}</div>;
}
