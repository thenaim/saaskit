'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  createProductSubscriptionSchema,
  ICreateProductSubscription,
} from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Switch } from '@repo/ui/components/ui/switch';
import { Textarea } from '@repo/ui/components/ui/textarea';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FeaturesFormField from '../../_components/features-form-field';
import MetadataFormField from '../../_components/metadata-form-field';
import { adminProductSubscriptionsApi } from '@/src/common/store/services/admin/product';
import PageHeader from '@/src/components/page-header';

export default function AdminProductSubscriptionCreatePage() {
  const router = useRouter();
  const params = useParams();

  const [onCreate, onCreateResult] =
    adminProductSubscriptionsApi.useCreateProductSubscriptionMutation();

  const form = useForm<ICreateProductSubscription['payload']>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      isPopular: false,
      isDefault: false,
      metadata: [{ key: '', value: '' }],
      features: [{ value: '' }],
    },
    resolver: yupResolver(createProductSubscriptionSchema),
  });
  const metadataForm = useFieldArray({
    control: form.control,
    name: 'metadata',
  });
  const featuresForm = useFieldArray({
    control: form.control,
    name: 'features',
  });

  const onSubmit: SubmitHandler<ICreateProductSubscription['payload']> = async (
    data,
  ) => {
    const update = await onCreate(data);
    if (update.data?.success) {
      toast('Created!');
      router.push('/admin/product/subscriptions');
    }
  };

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        title="Create Subscription Product"
        breadcrumbs={[
          {
            title: 'Subscription Products',
            href: '/admin/product/subscriptions',
          },
          {
            title: 'Create',
            href: `/admin/product/subscriptions/create`,
          },
        ]}
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
                        Leave empty to generate slug automatically from product
                        name.
                      </FormDescription>
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
                      <FormDescription>
                        One line description of the product.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2 items-center">
                        <FormLabel>Is Popular</FormLabel>
                        <FormControl>
                          <Switch
                            id="isPopular"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Mark this product as popular. This will be used to
                        highlight this product in the pricing page.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2 items-center">
                        <FormLabel>Is Default</FormLabel>
                        <FormControl>
                          <Switch
                            id="isDefault"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        A default product is a kind of a hidden product that
                        allows you to set the features (and metadata) for users
                        that have no active plan. Add a default product if you
                        want to offer a free tier to your users. You can only
                        have 1 default product and it cannot have any plans.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <MetadataFormField
                  // @ts-expect-error - e
                  control={form.control}
                  fields={metadataForm.fields}
                  onClickRemove={(index) => metadataForm.remove(index)}
                  onClickAdd={() => metadataForm.append({ key: '', value: '' })}
                />
              </div>
              <FeaturesFormField
                // @ts-expect-error - e
                control={form.control}
                fields={featuresForm.fields}
                onClickRemove={(index) => featuresForm.remove(index)}
                onClickAdd={() => featuresForm.append({ value: '' })}
                onDragDrop={featuresForm.move}
              />
              {/* <div>
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <div className="grid gap-2">
                          {featuresForm.fields.map((item, index) => (
                            <Card key={item.id}>
                              <CardHeader className="flex flex-row space-y-0 justify-between items-center p-1 border-b">
                                <Button variant={'ghost'} size={'sm'}>
                                  <ArrowUpDownIcon />
                                </Button>
                                <Button
                                  type="button"
                                  variant={'ghost'}
                                  size={'sm'}
                                  onClick={() => featuresForm.remove(index)}
                                >
                                  <TrashIcon className="text-red-600" />
                                </Button>
                              </CardHeader>
                              <CardContent className="p-4">
                                <FormField
                                  control={form.control}
                                  name={`${field.name}.${index}.value`}
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>Feature</FormLabel>
                                      <FormControl>
                                        <Input placeholder="value" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </FormControl>
                      <Button
                        type="button"
                        size={'sm'}
                        className="mt-2 w-full"
                        onClick={() => featuresForm.append({ value: '' })}
                      >
                        Add feature
                      </Button>
                      <FormDescription>
                        Add features that this product offers. These will be
                        displayed on the checkout page.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div> */}
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
              // onClick={createAndResetForm}
            >
              Create & create another
            </Button>
            <Button asChild type="button" variant="outline" size="sm">
              <Link href="/admin/product/subscriptions">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
