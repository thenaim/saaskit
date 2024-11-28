import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IPaymentProvider,
  IUpdatPaymentProviderCredential,
  updatPaymentProviderCredentialSchema,
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
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { adminPaymentProviderApi } from '@/src/common/store/services/admin/payment-provider';

const PaddlePaymentProviderCredentials = ({
  data,
}: {
  data: IPaymentProvider;
}) => {
  const router = useRouter();
  const params = useParams();

  const [onUpdate, onUpdateResult] =
    adminPaymentProviderApi.useUpdatePaymentProviderCredentialByIdMutation();

  const form = useForm<IUpdatPaymentProviderCredential['payload']['paddle']>({
    defaultValues: {
      verndorId: data?.verndorId || '',
      clientSideToken: data?.clientSideToken || '',
      vendorAuthCode: data?.vendorAuthCode || '',
      webhookSecret: data?.webhookSecret || '',
    },
    resolver: yupResolver(updatPaymentProviderCredentialSchema['paddle']),
  });

  const onSubmit: SubmitHandler<
    IUpdatPaymentProviderCredential['payload']['paddle']
  > = async (data) => {
    const update = await onUpdate({
      id: params?.providerId as string,
      body: data,
    });
    if (update.data?.success) {
      toast('Updated!', { duration: 6000 });
      router.push('/admin/settings/payment-providers');
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1 md:col-span-2">
            <CardContent className="space-y-4 p-6">
              <div>
                <FormField
                  control={form.control}
                  name="verndorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VENDOR ID</FormLabel>
                      <FormControl>
                        <Input id="verndorId" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="clientSideToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CLIENT SIDE TOKEN</FormLabel>
                      <FormControl>
                        <Input id="clientSideToken" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="vendorAuthCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VENDOR AUTH CODE</FormLabel>
                      <FormControl>
                        <Input id="vendorAuthCode" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="webhookSecret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WEBHOOK SECRET</FormLabel>
                      <FormControl>
                        <Input id="webhookSecret" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardContent className="p-6 space-y-6">
              <p>
                To integrate Google with your application, check out{' '}
                <Link
                  href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="transition-colors hover:text-slate-950 dark:hover:text-slate-50 text-primary"
                >
                  getting access to the Google API.
                </Link>
              </p>
              <p>When prompted to enter a redirect URI, use the following:</p>
              <div className="bg-secondary p-2 overflow-x-auto rounded-sm">
                {`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/providers/paddle/webhook`}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center space-x-4">
          <Button type="submit" size="sm" disabled={onUpdateResult.isLoading}>
            Save
          </Button>
          <Button asChild type="button" variant="outline" size="sm">
            <Link
              href={`/admin/settings/payment-providers/${params?.providerId}`}
            >
              Cancel
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaddlePaymentProviderCredentials;
