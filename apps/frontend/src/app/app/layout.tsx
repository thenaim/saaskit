import { CSSProperties } from 'react';

import { SidebarProvider } from '@repo/ui/components/ui/sidebar';

import { AppLayoutNavbar } from './_components/navbar';
import { AppLayoutSidebar } from './_components/sidebar';

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '18rem',
        } as CSSProperties
      }
    >
      <AppLayoutSidebar />
      <main className="w-full">
        <AppLayoutNavbar />

        {children}
      </main>
    </SidebarProvider>
  );
}

export default AppLayout;
