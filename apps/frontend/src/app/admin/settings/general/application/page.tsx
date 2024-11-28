'use client';

import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IUpdateProjectAplication,
  updateProjectAplicationSchema,
} from '@repo/api/schemas/project/project.schema';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
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
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { adminProjectApi } from '@/src/common/store/services/admin/project';

export default function AdminApplicationSettingsPage() {
  const router = useRouter();
  const [onUpdate, onUpdateResult] =
    adminProjectApi.useUpdateProjectAplicationMutation();
  const getProject = adminProjectApi.useGetProjectQuery(undefined);

  const form = useForm<IUpdateProjectAplication['payload']>({
    defaultValues: {
      name: '',
      description: '',
      supportEmail: '',
    },
    resolver: yupResolver(updateProjectAplicationSchema),
  });

  const onSubmit: SubmitHandler<IUpdateProjectAplication['payload']> = async (
    data,
  ) => {
    const update = await onUpdate(data);
    if (update.data?.success) {
      toast('Updated!');
    }
  };

  useEffect(() => {
    if (getProject.data) {
      const { name, description, supportEmail } = getProject.data.data;
      form.setValue('name', name);
      form.setValue('description', description || '');
      form.setValue('supportEmail', supportEmail || '');
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input id={field.name} type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea id={field.name} {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be used as the meta description for your site
                      (for pages that have no description).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="supportEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Email</FormLabel>
                    <FormControl>
                      <Input id={field.name} type="email" {...field} />
                    </FormControl>
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
