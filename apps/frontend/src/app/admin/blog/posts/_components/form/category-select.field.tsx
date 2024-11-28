import { useMemo, useState } from 'react';

import { ICreateBlogPost } from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@repo/ui/components/ui/command';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@repo/ui/components/ui/form';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@repo/ui/components/ui/popover';
import { cn } from '@repo/ui/lib/utils';
import Fuse from 'fuse.js';
import { find, isEmpty } from 'lodash';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { ControllerProps } from 'react-hook-form';

import { adminBlogApi } from '@/src/common/store/services/admin/blog';

const CategorySelectFormField = ({
  onSelect,
  ...props
}: Omit<ControllerProps<ICreateBlogPost['payload']>, 'render'> & {
  onSelect?: ((value: string) => void) | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const getBlogCategoriesList = adminBlogApi.useGetBlogCategoriesListQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const [value, setValue] = useState('');
  const items = useMemo(() => {
    const items = getBlogCategoriesList.data?.data || [];
    if (isEmpty(value)) {
      return items;
    }

    return new Fuse(items, {
      keys: ['name'],
    })
      .search(value)
      .map(({ item }) => item);
  }, [getBlogCategoriesList.data, value]);

  return (
    <FormField
      {...props}
      render={({ field }) => {
        const selectedTitle = field.value
          ? find(items, ({ id }) => id === field.value)?.name
          : 'Select category';

        return (
          <FormItem className="flex flex-col">
            <FormLabel>Category</FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'w-full justify-between',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {selectedTitle}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Search category..."
                    className="h-9"
                    value={value}
                    onValueChange={setValue}
                  />
                  <CommandList>
                    <CommandEmpty>No categories found.</CommandEmpty>
                    <CommandGroup>
                      {items.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.id}
                          onSelect={(e) => {
                            onSelect && onSelect(e);
                            setTimeout(() => setIsOpen(false));
                          }}
                        >
                          {item.name}
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              item.id === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CategorySelectFormField;
