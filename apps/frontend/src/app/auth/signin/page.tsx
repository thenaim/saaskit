'use client';
import { useContext } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { ISignIn, signInSchema } from '@repo/api';
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
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { AuthLayoutContext } from '../layout.context';
import { authApi } from '@/src/common/store/services/auth';

export default function AuthSignInPage() {
  const router = useRouter();

  const authLayoutContext = useContext(AuthLayoutContext);

  const [onSignIn, onSignInResult] = authApi.useSignInMutation();

  const form = useForm<ISignIn['payload']>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<ISignIn['payload']> = async (data) => {
    try {
      const res = await onSignIn(data);
      if (res.data?.data?.isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/app/dashboard');
      }
    } catch (error) {
      console.log('error', error);
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
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>
                <span className="text-sm">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="underline">
                    Sign up
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
                            disabled={onSignInResult.isLoading}
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Password
                          <Link
                            href="/auth/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                          >
                            Forgot your password?
                          </Link>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            disabled={onSignInResult.isLoading}
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
                  disabled={onSignInResult.isLoading}
                  className="w-full"
                >
                  Sign in
                </Button>

                {!isEmpty(authLayoutContext?.authProviders) && (
                  <>
                    <div className="relative">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="px-6 bg-background">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    {authLayoutContext.authProviders.map((item: any) => (
                      <Button
                        asChild
                        key={item.provider}
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        <Link
                          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/providers/${item.provider.toLowerCase()}/redirect`}
                        >
                          {item.name}
                        </Link>
                      </Button>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
