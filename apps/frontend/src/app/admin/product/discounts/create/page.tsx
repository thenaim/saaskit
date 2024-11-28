'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { createDiscountSchema, DiscountType, ICreateDiscount } from '@repo/api';
import { DateTimePicker } from '@repo/ui/components/date-time-picker';
import { MultiSelect } from '@repo/ui/components/multi-select';
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
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { Switch } from '@repo/ui/components/ui/switch';
import { Textarea } from '@repo/ui/components/ui/textarea';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import PageHeader from '@/src/components/page-header';

export default function AdminProductDiscountCreatePage() {
  const router = useRouter();
  const params = useParams();

  // const [onUpdate, onUpdateResult] =
  //   adminOauthProviderApi.useUpdateOauthProviderByIdMutation();

  const form = useForm<ICreateDiscount['payload']>({
    defaultValues: {
      name: '',
      description: '',
      type: 'flat',
      amount: undefined,
      validUntil: dayjs().add(1, 'day').toDate(),
      plans: [],
      oneTimeProducts: [],
      maxRedemptions: -1,
      maxRedemptionsPerUser: -1,
      isRecurring: false,
      isActive: true,
      durationInMonths: undefined,
      maximumRecurringIntervals: undefined,
    },
    resolver: yupResolver(createDiscountSchema),
  });

  const onSubmit: SubmitHandler<ICreateDiscount['payload']> = async (data) => {
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
        title="Create Discount"
        breadcrumbs={[
          {
            title: 'Discounts',
            href: '/admin/product/discounts',
          },
          {
            title: 'Create',
            href: `/admin/product/discounts/create`,
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={DiscountType.flat} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Fixed amount
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={DiscountType.percentage} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Percentage (of the total price)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input id="amount" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        If you choose percentage, enter a number between 0 and
                        100. For example: 90 for 90%. For fixed amount, enter
                        the amount in cents. For example: 1000 for $10.00
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="validUntil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid until</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {/* <Input
                          id="validUntil"
                          type="datetime-local"
                          {...field}
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="plans"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plans</FormLabel>
                      <FormControl>
                        <MultiSelect
                          items={[
                            { value: 'test', label: 'test' },
                            { value: 'test2', label: 'test2' },
                          ]}
                          selectedIds={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Select the plans that this discount will be applied to.
                        If you leave empty, discount will be applied to all
                        plans.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="oneTimeProducts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-time purchase products</FormLabel>
                      <FormControl>
                        <MultiSelect
                          items={[
                            { value: 'test', label: 'test' },
                            { value: 'test2', label: 'test2' },
                          ]}
                          selectedIds={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Select the one-time products that this discount will be
                        applied to. If you leave empty, discount will be applied
                        to all one-time products.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="maxRedemptions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max redemptions</FormLabel>
                      <FormControl>
                        <Input id="oneTimeProducts" type="text" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter -1 for unlimited redemptions (total).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="maxRedemptionsPerUser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max redemptions per user</FormLabel>
                      <FormControl>
                        <Input
                          id="maxRedemptionsPerUser"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter -1 for unlimited redemptions per user.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="isRecurring"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2 items-center">
                        <FormLabel>Is recurring</FormLabel>
                        <FormControl>
                          <Switch
                            id="isRecurring"
                            className="order-first"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        If enabled, this discount will keep being applied to the
                        subscription forever (or until valid if you set maximum
                        valid date).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                      <FormLabel>Duration in months</FormLabel>
                      <FormControl>
                        <Input id="description" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        This allows you define how many months the discount
                        should apply. Only works with payment providers that
                        support this feature. (like Stripe or Lemon Squeezy)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="maximumRecurringIntervals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum recurring intervals</FormLabel>
                      <FormControl>
                        <Input
                          id="maximumRecurringIntervals"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Amount of subscription billing periods that this
                        discount recurs for. Only works with payment providers
                        that support this feature. (like Paddle)
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
              <Link href="/admin/product/discounts">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
