'use client';

import { useEffect, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IUpdatePaymentProviderById,
  updatePaymentProviderByIdSchema,
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
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Switch } from '@repo/ui/components/ui/switch';
import { LockKeyholeIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { adminPaymentProviderApi } from '@/src/common/store/services/admin/payment-provider';
import PageHeader from '@/src/components/page-header';

export default function AdminPaymentProviderPage() {
  const router = useRouter();
  const params = useParams();

  const getProvider = adminPaymentProviderApi.useGetPaymentProviderByIdQuery(
    {
      id: params?.providerId as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [onUpdate, onUpdateResult] =
    adminPaymentProviderApi.useUpdatePaymentProviderByIdMutation();

  const form = useForm<IUpdatePaymentProviderById['payload']>({
    defaultValues: {
      isActive: false,
    },
    resolver: yupResolver(updatePaymentProviderByIdSchema),
  });

  const onSubmit: SubmitHandler<IUpdatePaymentProviderById['payload']> = async (
    data,
  ) => {
    const update = await onUpdate({
      id: params?.providerId as string,
      body: data,
    });
    if (update.data?.success) {
      toast('Updated!');
      router.push('/admin/settings/payment-providers');
    }
  };

  const breadcrumbs = useMemo(
    () => [
      {
        title: 'Payment Providers',
        href: '/admin/settings/payment-providers',
      },
      {
        title: getProvider.data?.data?.name || '...',
        href: `/admin/settings/payment-providers/${getProvider.data?.data?.id}`,
      },
    ],
    [getProvider.data],
  );

  useEffect(() => {
    if (getProvider.data) {
      form.setValue('isActive', getProvider.data?.data.isActive);
    }
  }, [getProvider.data]);

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Edit Payment Provider"
        endContent={
          <>
            <Button asChild type="button" size="sm">
              <Link
                href={`/admin/settings/payment-providers/${getProvider.data?.data?.id}/credentials`}
              >
                <LockKeyholeIcon className="hidden sm:block size-5" />
                Edit Credentials
              </Link>
            </Button>
          </>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          readOnly
                          disabled
                          value={getProvider.data?.data?.name || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider</FormLabel>
                      <FormControl>
                        <Input
                          id="provider"
                          type="text"
                          readOnly
                          disabled
                          value={getProvider.data?.data?.provider || ''}
                        />
                      </FormControl>
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Is Active</FormLabel>
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
            </CardContent>
          </Card>
          <div className="flex items-center space-x-4">
            <Button type="submit" size="sm" disabled={onUpdateResult.isLoading}>
              Save
            </Button>
            <Button asChild type="button" variant="outline" size="sm">
              <Link href="/admin/settings/oauth-providers">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}