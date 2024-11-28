import { redirect } from 'next/navigation';

export default function AuthConfirmPage() {
  redirect('/auth/signin');
}
