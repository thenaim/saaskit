'use client';

import { useEffect, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { createBlogPostSchema, ICreateBlogPost } from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import { Calendar } from '@repo/ui/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/ui/popover';
import { Switch } from '@repo/ui/components/ui/switch';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { cn } from '@repo/ui/lib/utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { CalendarIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AuthorSelectFormField from '../_components/form/author-select.field';
import CategorySelectFormField from '../_components/form/category-select.field';
import { adminBlogApi } from '@/src/common/store/services/admin/blog';
import PageHeader from '@/src/components/page-header';

const EditorInit = dynamic(
  () => import('@repo/editorjs').then((r) => r.EditorInit),
  { ssr: false },
);

export default function AdminBlogPostPage() {
  const router = useRouter();
  const params = useParams();

  const getBlogPost = adminBlogApi.useGetBlogPostByIdQuery(
    params?.postId as string,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [updateBlogPostById, updateBlogPostByIdResult] =
    adminBlogApi.useUpdateBlogPostByIdMutation();

  const form = useForm<ICreateBlogPost['payload']>({
    defaultValues: {
      title: '',
      description: '',
      content: undefined,
      slug: '',
      categotyId: '',
      userId: '',
      imageUrl: '',
      isPublished: false,
      publishedAt: dayjs().toDate(),
    },
    resolver: yupResolver(createBlogPostSchema),
  });

  const onSubmit: SubmitHandler<ICreateBlogPost['payload']> = async (data) => {
    const create = await updateBlogPostById({
      id: params?.postId as string,
      body: data,
    });
    if (create.data?.success) {
      toast('Updated!');
      router.push('/admin/blog/posts');
    }
  };

  const breadcrumbs = useMemo(
    () => [
      { title: 'Blog Posts', href: '/admin/blog/posts' },
      {
        title: getBlogPost.data?.data.title as string,
        href: `/admin/blog/posts/${getBlogPost.data?.data.id}`,
      },
    ],
    [getBlogPost.data],
  );

  useEffect(() => {
    if (getBlogPost.data) {
      const fields = Object.keys(
        form.formState.defaultValues || {},
      ) as (keyof typeof form.formState.defaultValues)[];

      for (const field of fields) {
        if (!isEmpty(getBlogPost.data?.data[field])) {
          form.setValue(field, getBlogPost.data?.data[field]);
        }
      }
    }
  }, [getBlogPost.data]);

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader breadcrumbs={breadcrumbs} title="Edit Blog Post" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <Card className="col-span-1 lg:col-span-2">
              <CardContent className="space-y-4 p-4">
                <div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input id="title" type="text" {...field} />
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
                          <Textarea id="description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="content.blocks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body</FormLabel>
                        <FormControl>
                          <div>
                            <EditorInit
                              id={field.name}
                              name={field.name}
                              initData={
                                getBlogPost.data?.data
                                  .content as unknown as undefined
                              }
                              onChangeContent={async (api) => {
                                const content = await api.saver.save();
                                form.setValue('content', content, {
                                  shouldDirty: true,
                                  shouldTouch: true,
                                  shouldValidate: true,
                                });
                                form.trigger('content');
                              }}
                              className={clsx(
                                'prose prose-sm max-w-none prose-p:mt-0 prose-blockquote:mt-0 prose-code:bg-gray-200 prose-ol:mt-0 prose-code:[&:not(pre)]:p-0.5',
                                'focus:outline-none',
                                'border rounded-md px-4',
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <div className="col-span-1 lg:grid-cols-2">
              <Card>
                <CardContent className="space-y-4 p-4">
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
                          <FormMessage />
                          <FormDescription>
                            Will be used in the URL of the post. Leave empty to
                            generate slug automatically from title.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <CategorySelectFormField
                      control={form.control}
                      name="categotyId"
                      onSelect={(value) => form.setValue('categotyId', value)}
                    />
                  </div>
                  <div>
                    <AuthorSelectFormField
                      control={form.control}
                      name="userId"
                      onSelect={(value) => form.setValue('userId', value)}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <Input id="imageUrl" type="file" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="isPublished"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Is published</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="publishedAt"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Published at</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {dayjs(field.value).format('DD-MM-YYYY')}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-[var(--radix-popper-anchor-width)] p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button type="submit" color="primary" size="sm">
              Save
            </Button>
            <Button asChild type="button" variant="outline" size="sm">
              <Link href="/admin/blog/posts">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
