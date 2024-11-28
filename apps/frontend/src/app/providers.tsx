'use client';

import { Toaster } from '@repo/ui/components/ui/sonner';
import { TooltipProvider } from '@repo/ui/components/ui/tooltip';
import { ThemeProvider } from '@repo/ui/lib/next-themes/index';

import StoreProvider from '../common/store/provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-right" />
      </ThemeProvider>
    </StoreProvider>
  );
}
