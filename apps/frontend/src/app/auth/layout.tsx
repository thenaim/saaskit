import AuthLayoutProviders from './layout.providers';
import { getAuthProvidersAction } from '../../actions/auth-providers.action';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authProviders = await getAuthProvidersAction();

  return (
    <AuthLayoutProviders authProviders={authProviders}>
      {children}
    </AuthLayoutProviders>
  );
}
