'use client';

import React from 'react';

import { AuthLayoutContext, AuthLayoutContextProps } from './layout.context';

const AuthLayoutProviders = ({
  children,
  ...props
}: Readonly<
  {
    children: React.ReactNode;
  } & AuthLayoutContextProps
>) => {
  return (
    <AuthLayoutContext.Provider value={props}>
      {children}
    </AuthLayoutContext.Provider>
  );
};

export default AuthLayoutProviders;
