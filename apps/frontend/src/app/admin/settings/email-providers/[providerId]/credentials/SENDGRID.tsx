import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IEmailProvider,
  IUpdatEmailProviderCredential,
  updatEmailProviderCredentialSchema,
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

import { adminEmailProviderApi } from '@/src/common/store/services/admin/email-provider';

const SENDGRIDEmailProviderCredentials = ({
  data,
}: {
  data: IEmailProvider;
}) => {
  const router = useRouter();
  const params = useParams();

  const [onUpdate, onUpdateResult] =
    adminEmailProviderApi.useUpdateEmailProviderCredentialByIdMutation();

  const form = useForm<IUpdatEmailProviderCredential['payload']['sendgrid']>({
    defaultValues: {
      key: data?.key || '',
    },
    resolver: yupResolver(updatEmailProviderCredentialSchema['sendgrid']),
  });

  const onSubmit: SubmitHandler<
    IUpdatEmailProviderCredential['payload']['sendgrid']
  > = async (data) => {
    const update = await onUpdate({
      id: params?.providerId as string,
      body: data,
    });
    if (update.data?.success) {
      toast('Updated!');
      router.push('/admin/settings/email-providers');
    }
  };

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
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API KEY</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
            <Link
              href={`/admin/settings/email-providers/${params?.providerId as string}`}
            >
              Cancel
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SENDGRIDEmailProviderCredentials;
