import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IOauthProvider,
  IUpdatOauthProviderCredential,
  updatOauthProviderCredentialSchema,
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

import { adminOauthProviderApi } from '@/src/common/store/services/admin/oauth-provider';

const FacebookOauthProviderCredentials = ({
  data,
}: {
  data: IOauthProvider;
}) => {
  const router = useRouter();
  const params = useParams();

  const [onUpdate, onUpdateResult] =
    adminOauthProviderApi.useUpdateOauthProviderCredentialByIdMutation();

  const form = useForm<IUpdatOauthProviderCredential['payload']['facebook']>({
    defaultValues: {
      clientId: data?.clientId || '',
      clientSecret: data?.clientSecret || '',
    },
    resolver: yupResolver(updatOauthProviderCredentialSchema['facebook']),
  });

  const onSubmit: SubmitHandler<
    IUpdatOauthProviderCredential['payload']['facebook']
  > = async (data) => {
    const update = await onUpdate({
      id: params?.providerId as string,
      body: data,
    });
    if (update.data?.success) {
      toast('Updated!', { duration: 6000 });
      router.push('/admin/settings/oauth-providers');
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
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CLIENT ID</FormLabel>
                    <FormControl>
                      <Input id="clientId" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="clientSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CLIENT SECRET</FormLabel>
                    <FormControl>
                      <Input id="clientSecret" type="text" {...field} />
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
            <Link href="/admin/blog/categories">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FacebookOauthProviderCredentials;
