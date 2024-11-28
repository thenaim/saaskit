'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema, IForgotPassword } from '@repo/api';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authApi } from '@/src/common/store/services/auth';

export default function AuthForgotPasswordPage() {
  const router = useRouter();

  const [onForgotPassword, onForgotPasswordResult] =
    authApi.useForgotPasswordMutation();

  const form = useForm<IForgotPassword['payload']>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<IForgotPassword['payload']> = async (data) => {
    try {
      const res = await onForgotPassword(data);
      toast('Success! Check your email address.');
      router.push('/auth/signin');
    } catch (error) {
      toast.error('Error, try again!');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Form {...form}>
        <form
          className="sm:mx-auto sm:w-full sm:max-w-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Forgot Password</CardTitle>
              <CardDescription>
                <span className="text-sm">
                  Have an account?{' '}
                  <Link href="/auth/signin" className="underline">
                    Sign in
                  </Link>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            disabled={onForgotPasswordResult.isLoading}
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
                  disabled={onForgotPasswordResult.isLoading}
                  className="w-full"
                >
                  Send Reset Password Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
