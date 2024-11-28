'use client';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { ITestEmailProviderById, testEmailProviderByIdSchema } from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@repo/ui/components/ui/dialog';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { adminEmailProviderApi } from '@/src/common/store/services/admin/email-provider';

export const SendTestEmailDialog = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const [onTest, onTestResult] =
    adminEmailProviderApi.useTestEmailProviderByIdMutation();

  const form = useForm<ITestEmailProviderById['payload']>({
    defaultValues: {
      email: '',
      subject: '',
      body: '',
    },
    resolver: yupResolver(testEmailProviderByIdSchema),
  });

  const onSubmit: SubmitHandler<ITestEmailProviderById['payload']> = async (
    data,
  ) => {
    const test = await onTest({
      id: params?.providerId as string,
      body: data,
    });
    if (test.data?.success) {
      toast('Sended!', { duration: 6000 });
      form.reset();
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <Form {...form}>
          <form
            className="grid grid-cols-1 gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>Send test email</DialogTitle>
            </DialogHeader>
            <div>
              <FormField
                control={form.control}
                name="email"
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
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input id="provider" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea id="body" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={!form.formState.isValid || onTestResult.isLoading}
              >
                Send test email
              </Button>
              <Button
                type="button"
                variant={'outline'}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
