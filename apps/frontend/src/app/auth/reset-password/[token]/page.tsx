'use client';
import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { IResetPassword, resetPasswordSchema } from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authApi } from '@/src/common/store/services/auth';

export default function AuthResetPasswordPage() {
  const params = useParams();
  const router = useRouter();

  const [onResetPassword, onResetPasswordResult] =
    authApi.useResetPasswordMutation();

  const form = useForm<IResetPassword['payload']>({
    defaultValues: {
      token: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<IResetPassword['payload']> = async (data) => {
    try {
      const res = await onResetPassword(data);
      toast('Success! Try to sign in.');
      router.push('/auth/signin');
    } catch (error) {
      toast.error('Error, try again!');
    }
  };

  useEffect(() => {
    form.setValue('token', params?.token as string);
  }, [params]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Form {...form}>
        <form
          className="sm:mx-auto sm:w-full sm:max-w-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            disabled={onResetPasswordResult.isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            type="password"
                            disabled={onResetPasswordResult.isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={onResetPasswordResult.isLoading}
                  className="w-full"
                >
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
