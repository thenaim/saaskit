'use client';
import { useContext } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { ISignUp, signUpSchema } from '@repo/api';
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

export default function AuthSignUpPage() {
  const router = useRouter();

  const authLayoutContext = useContext(AuthLayoutContext);

  const [onSignUp, onSignUpResult] = authApi.useSignUpMutation();

  const form = useForm<ISignUp['payload']>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<ISignUp['payload']> = async (data) => {
    try {
      const res = await onSignUp(data);
      toast('Success! Try to sign in.');
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
              <CardTitle className="text-2xl">Sign up</CardTitle>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Name"
                            disabled={onSignUpResult.isLoading}
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            disabled={onSignUpResult.isLoading}
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            disabled={onSignUpResult.isLoading}
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
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            type="password"
                            disabled={onSignUpResult.isLoading}
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
                  disabled={onSignUpResult.isLoading}
                  className="w-full"
                >
                  Sign up
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
