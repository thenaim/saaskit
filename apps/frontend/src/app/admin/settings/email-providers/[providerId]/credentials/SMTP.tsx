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

const SMTPEmailProviderCredentials = ({ data }: { data: IEmailProvider }) => {
  const router = useRouter();
  const params = useParams();

  const [onUpdate, onUpdateResult] =
    adminEmailProviderApi.useUpdateEmailProviderCredentialByIdMutation();

  const form = useForm<IUpdatEmailProviderCredential['payload']['smtp']>({
    defaultValues: {
      host: data?.host || '',
      port: data?.port || '',
      username: data?.username || '',
      password: data?.password || '',
    },
    resolver: yupResolver(updatEmailProviderCredentialSchema['smtp']),
  });

  const onSubmit: SubmitHandler<
    IUpdatEmailProviderCredential['payload']['smtp']
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
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host</FormLabel>
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
            <div>
              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port</FormLabel>
                    <FormControl>
                      <Input
                        id="port"
                        type="number"
                        autoComplete="off"
                        {...field}
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input id="username" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
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

export default SMTPEmailProviderCredentials;
