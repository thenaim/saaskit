'use client';

import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authApi } from '@/src/common/store/services/auth';

export default function AuthForgotPasswordPage() {
  const router = useRouter();
  const params = useParams();

  const [onSignUpConfirm, onSignUpConfirmResult] =
    authApi.useSignUpConfirmMutation();

  const confirmEmail = async () => {
    try {
      const res = await onSignUpConfirm({ token: params?.token as string });
      toast('Success! Your email is confirmed.');
      router.push('/auth/signin');
    } catch (error) {
      toast.error('Error, try again!');
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Confirm Email Address</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              size="lg"
              className="w-full"
              disabled={onSignUpConfirmResult.isLoading}
              onClick={confirmEmail}
            >
              Confirm Email Address
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
