import React from 'react';

import { Button } from '@repo/ui/components/ui/button';
import { Card, CardHeader, CardContent } from '@repo/ui/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { TrashIcon } from 'lucide-react';
import { Control, FieldArrayWithId } from 'react-hook-form';

function MetadataFormField({
  control,
  fields,
  onClickRemove,
  onClickAdd,
}: {
  control: Control<{ metadata: { key: string; value: string }[] }, 'metadata'>;
  fields: FieldArrayWithId<
    { metadata: { key: string; value: string }[] },
    'metadata'
  >[];
  onClickRemove: (index: number) => void;
  onClickAdd: () => void;
}) {
  return (
    <FormField
      control={control}
      name="metadata"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Metadata</FormLabel>
          <FormControl>
            <Card>
              <CardHeader className="flex flex-row space-y-0 justify-between items-center py-2 md:py-4 border-b">
                <FormLabel className="w-full">Property Key</FormLabel>
                <FormLabel className="w-full mr-10">Property Value</FormLabel>
              </CardHeader>
              <CardContent className="grid gap-4 p-2 md:p-4">
                {fields.map((item, index) => (
                  <div key={item.id} className="flex gap-2">
                    <FormField
                      control={control}
                      name={`${field.name}.${index}.key`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input placeholder="key" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`${field.name}.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input placeholder="value" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      className="self-end mb-1"
                      variant={'ghost'}
                      size={'sm'}
                      onClick={() => onClickRemove(index)}
                    >
                      <TrashIcon className="text-red-600" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FormControl>
          <Button
            type="button"
            size={'sm'}
            className="w-full"
            onClick={onClickAdd}
          >
            Add metadata
          </Button>
          <FormDescription>
            Add features that this product offers. These will be displayed on
            the checkout page.
          </FormDescription>
        </FormItem>
      )}
    />
  );
}

export default MetadataFormField;
