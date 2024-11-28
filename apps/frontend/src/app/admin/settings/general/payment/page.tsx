'use client';

import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IUpdateProjectPayment,
  updateProjectPaymentSchema,
} from '@repo/api/schemas/project/project.schema';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/ui/popover';
import { Switch } from '@repo/ui/components/ui/switch';
import { cn } from '@repo/ui/lib/utils';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { adminProjectApi } from '@/src/common/store/services/admin/project';

const currencies = [{ label: 'USD', value: 'USD' }] as const;

export default function AdminPaymentSettingsPage() {
  const router = useRouter();
  const [onUpdate, onUpdateResult] =
    adminProjectApi.useUpdateProjectPaymentMutation();
  const getProject = adminProjectApi.useGetProjectQuery(undefined);

  const form = useForm<IUpdateProjectPayment['payload']>({
    defaultValues: {
      defaultCurrency: '',
      isPaymentProration: true,
    },
    resolver: yupResolver(updateProjectPaymentSchema),
  });

  const onSubmit: SubmitHandler<IUpdateProjectPayment['payload']> = async (
    data,
  ) => {
    const update = await onUpdate(data);
    if (update.data?.success) {
      toast('Updated!');
    }
  };

  useEffect(() => {
    if (getProject.data && getProject.data.data?.payment) {
      const { defaultCurrency, isPaymentProration } =
        getProject.data.data.payment;
      form.setValue('defaultCurrency', defaultCurrency);
      form.setValue('isPaymentProration', isPaymentProration);
    }
  }, [getProject]);

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardContent className="space-y-4 p-6">
            <div>
              <FormField
                control={form.control}
                name="defaultCurrency"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Default Currency</FormLabel>
                    <Popover>
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
                            {field.value
                              ? currencies.find(
                                  (item) => item.value === field.value,
                                )?.label
                              : 'Select currency'}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search currency..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No currency found.</CommandEmpty>
                            <CommandGroup>
                              {currencies.map((item) => (
                                <CommandItem
                                  value={item.label}
                                  key={item.value}
                                  onSelect={() => {
                                    form.setValue(
                                      'defaultCurrency',
                                      item.value,
                                    );
                                  }}
                                >
                                  {item.label}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      item.value === field.value
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
                    <FormDescription>
                      This is the currency that will be used for all payments.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="isPaymentProration"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Payment Proration Enabled</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      If enabled, when a customer upgrades or downgrades their
                      subscription, the amount they have already paid will be
                      prorated and credited towards their new plan.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center space-x-4">
          <Button type="submit" size="sm">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
