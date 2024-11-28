'use client';

import { useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { createBlogCategorySchema, ICreateBlogCategory } from '@repo/api';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { adminBlogApi } from '@/src/common/store/services/admin/blog';
import PageHeader from '@/src/components/page-header';

export default function AdminBlogCategoryCreatePage() {
  const router = useRouter();

  const [createBlogCategory, createBlogCategoryResult] =
    adminBlogApi.useCreateBlogCategoryMutation();

  const form = useForm<ICreateBlogCategory['payload']>({
    defaultValues: {
      name: '',
      slug: '',
    },
    resolver: yupResolver(createBlogCategorySchema),
  });

  const onSubmit: SubmitHandler<ICreateBlogCategory['payload']> = async (
    data,
  ) => {
    const create = await createBlogCategory(data);
    if (create.data?.success) {
      toast('Created!');
      router.push('/admin/blog/categories');
    }
  };

  const breadcrumbs = useMemo(
    () => [
      { title: 'Blog Post Categories', href: '/admin/blog/categories' },
      {
        title: 'Create',
        href: `/admin/blog/categories/create`,
      },
    ],
    [],
  );

  const createAndResetForm = async () => {
    await form.trigger(undefined, {
      shouldFocus: true,
    });

    if (!form.formState.isValid) {
      return;
    }

    const create = await createBlogCategory(form.getValues());
    if (create?.data?.success) {
      toast('Created!');
      form.reset();
    }
  };

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader breadcrumbs={breadcrumbs} title="Create Blog Post Category" />
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
                        <Input id="name" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input id="slug" type="text" {...field} />
                      </FormControl>
                      <FormDescription>
                        Leave empty to generate slug automatically name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center space-x-4">
            <Button type="submit" color="primary" size="sm">
              Create
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={createAndResetForm}
            >
              Create & create another
            </Button>
            <Button asChild type="button" variant="outline" size="sm">
              <Link href="/admin/blog/categories">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
