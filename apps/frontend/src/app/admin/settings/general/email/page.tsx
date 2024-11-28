'use client';

import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IUpdateProjectEmail,
  updateProjectEmailSchema,
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
import { Input } from '@repo/ui/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/ui/popover';
import { cn } from '@repo/ui/lib/utils';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { adminProjectApi } from '@/src/common/store/services/admin/project';
import { EmailProvider } from '@repo/api';

const emailProviders = [{ label: 'SMTP', value: EmailProvider.smtp }] as const;

export default function AdminEmailSettingsPage() {
  const router = useRouter();
  const [onUpdate, onUpdateResult] =
    adminProjectApi.useUpdateProjectEmailMutation();
  const getProject = adminProjectApi.useGetProjectQuery(undefined);

  const form = useForm<IUpdateProjectEmail['payload']>({
    defaultValues: {
      defaultEmailProvider: EmailProvider.smtp,
      defaultEmailFromName: '',
      defaultEmailFromEmail: '',
    },
    resolver: yupResolver(updateProjectEmailSchema),
  });

  const onSubmit: SubmitHandler<IUpdateProjectEmail['payload']> = async (
    data,
  ) => {
    const update = await onUpdate(data);
    if (update.data?.success) {
      toast('Updated!');
    }
  };

  useEffect(() => {
    if (getProject.data && getProject.data.data?.email) {
      const {
        defaultEmailProvider,
        defaultEmailFromName,
        defaultEmailFromEmail,
      } = getProject.data.data.email;
      form.setValue('defaultEmailProvider', defaultEmailProvider);
      form.setValue('defaultEmailFromName', defaultEmailFromName);
      form.setValue('defaultEmailFromEmail', defaultEmailFromEmail);
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
                name="defaultEmailProvider"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Default Email Provider</FormLabel>
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
                              ? emailProviders.find(
                                  (item) => item.value === field.value,
                                )?.label
                              : 'Select email provider'}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search email provider..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              No email provider found.
                            </CommandEmpty>
                            <CommandGroup>
                              {emailProviders.map((item) => (
                                <CommandItem
                                  value={item.label}
                                  key={item.value}
                                  onSelect={() => {
                                    form.setValue(
                                      'defaultEmailProvider',
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
                      This is the email provider that will be used for all
                      emails.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="defaultEmailFromName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default "From" Email Name</FormLabel>
                    <FormControl>
                      <Input id={field.name} type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name that will be used as the "From" name for
                      all emails.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="defaultEmailFromEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default "From" Email Address</FormLabel>
                    <FormControl>
                      <Input id={field.name} type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the email address that will be used as the "From"
                      address for all emails.
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
