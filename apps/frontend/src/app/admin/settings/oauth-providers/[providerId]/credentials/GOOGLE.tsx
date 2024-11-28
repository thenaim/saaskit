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

const GoogleOauthProviderCredentials = ({ data }: { data: IOauthProvider }) => {
  const router = useRouter();
  const params = useParams();

  const [onUpdate, onUpdateResult] =
    adminOauthProviderApi.useUpdateOauthProviderCredentialByIdMutation();

  const form = useForm<IUpdatOauthProviderCredential['payload']['google']>({
    defaultValues: {
      clientId: data?.clientId || '',
      clientSecret: data?.clientSecret || '',
    },
    resolver: yupResolver(updatOauthProviderCredentialSchema['google']),
  });

  const onSubmit: SubmitHandler<
    IUpdatOauthProviderCredential['payload']['google']
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
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardContent className="space-y-4 p-6">
              <div>
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CLIENT ID</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="off" {...field} />
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
                        <Input type="text" autoComplete="off" {...field} />
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
                http://localhost:4200/auth/providers/google/callback
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
              href={`/admin/settings/oauth-providers/${params?.providerId as string}`}
            >
              Cancel
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GoogleOauthProviderCredentials;
