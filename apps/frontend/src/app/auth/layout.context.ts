import { createContext } from 'react';

import { IOauthProvider } from '@repo/api';

export type AuthLayoutContextProps = {
  authProviders: Pick<IOauthProvider, 'name' | 'provider'>[];
};
export const AuthLayoutContext = createContext<AuthLayoutContextProps>({
  authProviders: [],
});
