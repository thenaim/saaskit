'use client';

import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IUpdateProjectAnalytics,
  updateProjectAnalyticsSchema,
} from '@repo/api/schemas/project/project.schema';
import { Button } from '@repo/ui/components/ui/button';
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
import { Switch } from '@repo/ui/components/ui/switch';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { adminProjectApi } from '@/src/common/store/services/admin/project';

export default function AdminAnalyticsCookiesSettingsPage() {
  const router = useRouter();
  const [onUpdate, onUpdateResult] =
    adminProjectApi.useUpdateProjectAnalyticsMutation();
  const getProject = adminProjectApi.useGetProjectQuery(undefined);

  const form = useForm<IUpdateProjectAnalytics['payload']>({
    defaultValues: {
      isCookieConsentBarEnabled: false,
      googleTrackingId: '',
      trackingScripts: '',
    },
    resolver: yupResolver(updateProjectAnalyticsSchema),
  });

  const onSubmit: SubmitHandler<IUpdateProjectAnalytics['payload']> = async (
    data,
  ) => {
    const update = await onUpdate(data);
    if (update.data?.success) {
      toast('Updated!');
    }
  };

  useEffect(() => {
    if (getProject.data && getProject.data.data?.analytics) {
      const { isCookieConsentBarEnabled, googleTrackingId, trackingScripts } =
        getProject.data.data.analytics;
      form.setValue('isCookieConsentBarEnabled', isCookieConsentBarEnabled);
      form.setValue('googleTrackingId', googleTrackingId || '');
      form.setValue('trackingScripts', trackingScripts || '');
    }
  }, [getProject]);

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
                name="isCookieConsentBarEnabled"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Cookie Consent Bar Enabled</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      If enabled, the cookie consent bar will be shown to users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="googleTrackingId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Tracking ID</FormLabel>
                    <FormControl>
                      <Input id={field.name} type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Google analytics will only be inserted if either "Cookie
                      Consent Bar" is disabled or in case user has consented to
                      cookies.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="trackingScripts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Tracking Scripts </FormLabel>
                    <FormControl>
                      <Textarea id={field.name} {...field} />
                    </FormControl>
                    <FormDescription>
                      Paste in any other analytics or tracking scripts here.
                      Those scripts will only be inserted if either "Cookie
                      Consent Bar" is disabled or in case user has consented to
                      cookies.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center space-x-4">
          <Button type="submit" size="sm">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
