'use client';

import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  IUpdateProjectReCaptcha,
  updateProjectReCaptchaSchema,
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
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { adminProjectApi } from '@/src/common/store/services/admin/project';

export default function AdminReCaptchaSettingsPage() {
  const router = useRouter();
  const [onUpdate, onUpdateResult] =
    adminProjectApi.useUpdateProjectReCaptchaMutation();
  const getProject = adminProjectApi.useGetProjectQuery(undefined);

  const form = useForm<IUpdateProjectReCaptcha['payload']>({
    defaultValues: {
      isReCaptchaEnabled: false,
      reCaptchaApiSiteKey: '',
      reCaptchaApiSiteSecret: '',
    },
    resolver: yupResolver(updateProjectReCaptchaSchema),
  });

  const onSubmit: SubmitHandler<IUpdateProjectReCaptcha['payload']> = async (
    data,
  ) => {
    const update = await onUpdate(data);
    if (update.data?.success) {
      toast('Updated!');
    }
  };

  useEffect(() => {
    if (getProject.data && getProject.data.data?.reCaptcha) {
      const {
        isReCaptchaEnabled,
        reCaptchaApiSiteKey,
        reCaptchaApiSiteSecret,
      } = getProject.data.data.reCaptcha;
      form.setValue('isReCaptchaEnabled', isReCaptchaEnabled);
      form.setValue('reCaptchaApiSiteKey', reCaptchaApiSiteKey || '');
      form.setValue('reCaptchaApiSiteSecret', reCaptchaApiSiteSecret || '');
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
                name="isReCaptchaEnabled"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Recaptcha Enabled</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      If enabled, recaptcha will be used on the registration &
                      login forms. For more info on how to configure Recaptcha,
                      see the documentation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="reCaptchaApiSiteKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recaptcha Site Key </FormLabel>
                    <FormControl>
                      <Input id={field.name} type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="reCaptchaApiSiteSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recaptcha Secret Key</FormLabel>
                    <FormControl>
                      <Input id={field.name} type="text" {...field} />
                    </FormControl>
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
