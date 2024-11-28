'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { createPlanSchema, ICreatePlan, PlanIntervalList } from '@repo/api';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { Switch } from '@repo/ui/components/ui/switch';
import { Textarea } from '@repo/ui/components/ui/textarea';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import ProductSelectFormItem from '../../_components/product-select-form-item';
import PageHeader from '@/src/components/page-header';

export default function AdminProductPlanCreatePage() {
  const router = useRouter();
  const params = useParams();

  // const [onUpdate, onUpdateResult] =
  //   adminOauthProviderApi.useUpdateOauthProviderByIdMutation();

  const form = useForm<ICreatePlan['payload']>({
    defaultValues: {
      name: '',
      slug: '',
      productId: '',
      intervalCount: undefined,
      interval: undefined,
      isHasTrial: false,
      trialIntervalCount: undefined,
      trialInterval: undefined,
      isActive: false,
    },
    resolver: yupResolver(createPlanSchema),
  });

  const onSubmit: SubmitHandler<ICreatePlan['payload']> = async (data) => {
    // const update = await onUpdate({
    //   id: params?.providerId as string,
    //   body: data,
    // });
    // if (update.data?.success) {
    //   toast('Updated!');
    //   router.push('/admin/settings/oauth-providers');
    // }
  };

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        title="Create Plan"
        breadcrumbs={[
          {
            title: 'Plans',
            href: '/admin/product/plans',
          },
          {
            title: 'Create',
            href: `/admin/product/plans/create`,
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
                  name="productId"
                  render={({ field }) => (
                    <ProductSelectFormItem field={field} />
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="intervalCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interval count</FormLabel>
                      <FormControl>
                        <Input id="intervalCount" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        The number of intervals (weeks, months, etc) between
                        each billing cycle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interval</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interval" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PlanIntervalList.map((item) => (
                            <SelectItem
                              key={item.label}
                              value={item.value as string}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The interval (week, month, etc) between each billing
                        cycle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="isHasTrial"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2 items-center">
                        <FormLabel>Has trial</FormLabel>
                        <FormControl>
                          <Switch
                            id="isHasTrial"
                            className="order-first"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {form.getValues().isHasTrial && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="trialIntervalCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trial interval count</FormLabel>
                        <FormControl>
                          <Input
                            id="trialIntervalCount"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="trialInterval"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trial interval</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select trial interval" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PlanIntervalList.map((item) => (
                              <SelectItem
                                key={item.label}
                                value={item.value as string}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <div>
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2 items-center">
                        <FormLabel>Active</FormLabel>
                        <FormControl>
                          <Switch
                            id="isActive"
                            className="order-first"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        If the product is not active, your customers will not be
                        able to purchase it.
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
              <Link href="/admin/product/plans">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
