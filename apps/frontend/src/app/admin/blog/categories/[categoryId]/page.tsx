'use client';

import { useEffect, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IUpdateBlogCategoryById,
  updateBlogCategoryByIdSchema,
} from '@repo/api';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@repo/ui/components/ui/alert-dialog';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Form,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { adminBlogApi } from '@/src/common/store/services/admin/blog';
import PageHeader from '@/src/components/page-header';

export default function AdminBlogCategoryPage() {
  const router = useRouter();
  const params = useParams();

  const getBlogCategory = adminBlogApi.useGetBlogCategoryByIdQuery(
    params?.categoryId as string,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [updateBlogCategoryById, updateBlogCategoryByIdResult] =
    adminBlogApi.useUpdateBlogCategoryByIdMutation();

  const [deleteBlogCategoryById, deleteBlogCategoryByIdResult] =
    adminBlogApi.useDeleteBlogCategoryByIdMutation();

  const form = useForm<IUpdateBlogCategoryById['payload']>({
    defaultValues: {
      name: '',
      slug: '',
    },
    resolver: yupResolver(updateBlogCategoryByIdSchema),
  });

  const onSubmit: SubmitHandler<IUpdateBlogCategoryById['payload']> = async (
    data,
  ) => {
    const update = await updateBlogCategoryById({
      id: params?.categoryId as string,
      body: data,
    });
    if (update.data?.success) {
      toast('Updated!');
      router.push('/admin/blog/categories');
    }
  };

  const breadcrumbs = useMemo(
    () =>
      getBlogCategory.data
        ? [
            { title: 'Blog Post Categories', href: '/admin/blog/categories' },
            {
              title: getBlogCategory.data.data.name,
              href: `/admin/blog/categories/${getBlogCategory.data.data.id}`,
            },
          ]
        : [{ title: 'Blog Post Categories', href: '/admin/blog/categories' }],
    [getBlogCategory.data],
  );

  useEffect(() => {
    if (getBlogCategory.data) {
      form.setValue('name', getBlogCategory.data?.data.name);
      form.setValue('slug', getBlogCategory.data?.data.slug);
    }
  }, [getBlogCategory.data]);

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Edit Blog Post Category"
        endContent={
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={deleteBlogCategoryByIdResult.isLoading}
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete <strong>({getBlogCategory.data?.data.name})</strong>{' '}
                  Category
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
                      await deleteBlogCategoryById(
                        params?.categoryId as string,
                      );
                      toast('Deleted!');
                      router.push('/admin/blog/categories');
                    }}
                  >
                    Confirm
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
      />
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
            <Button type="submit" size="sm">
              Save
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
