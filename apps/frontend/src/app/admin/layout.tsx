'use client';

import { CSSProperties } from 'react';

import { SidebarProvider } from '@repo/ui/components/ui/sidebar';

import { AdminLayoutNavbar } from './_components/navbar';
import { AdminLayoutSidebar } from './_components/sidebar';
import { authApi } from '@/src/common/store/services/auth';

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = authApi.useMeQuery(undefined, {
    pollingInterval: 5 * 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '18rem',
        } as CSSProperties
      }
    >
      <AdminLayoutSidebar />
      <main className="w-full">
        <AdminLayoutNavbar />

        {children}
      </main>
    </SidebarProvider>
  );
}

export default AdminLayout;
