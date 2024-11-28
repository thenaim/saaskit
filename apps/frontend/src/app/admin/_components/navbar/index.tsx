'use client';

import { Button } from '@repo/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@repo/ui/components/ui/dropdown-menu';
import { useSidebar } from '@repo/ui/components/ui/sidebar';
import { useTheme } from '@repo/ui/lib/next-themes/index';
import {
  HomeIcon,
  LogOutIcon,
  MonitorCogIcon,
  MonitorIcon,
  MoonIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  SunIcon,
  UserCircleIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { authApi } from '@/src/common/store/services/auth';

export function AdminLayoutNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [onSignOut] = authApi.useSignOutMutation();

  const sidebar = useSidebar();

  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-12 items-center gap-4 border-b bg-sidebar px-4">
      <Button
        variant="ghost"
        size="icon"
        className="mr-auto"
        onClick={sidebar.toggleSidebar}
      >
        {sidebar.open ? (
          <PanelLeftCloseIcon className="!size-5" />
        ) : (
          <PanelLeftOpenIcon className="!size-5" />
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-auto">
            <SunIcon className="!size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute !size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <SunIcon />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <MoonIcon />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            <MonitorIcon />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            {/* <img
              src="https://ui.shadcn.com/avatars/03.png"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            /> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1 min-w-52 p-2">
          {pathname.startsWith('/app/') && (
            <>
              <DropdownMenuItem asChild>
                <Link href={'/admin/dashboard'}>
                  <MonitorCogIcon />
                  <span>Switch to Admin Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="-mx-2" />
            </>
          )}
          {pathname.startsWith('/admin/') && (
            <>
              <DropdownMenuItem asChild>
                <Link href={'/app/dashboard'}>
                  <MonitorCogIcon />
                  <span>Switch to User Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="-mx-2" />
            </>
          )}

          <DropdownMenuItem asChild>
            <Link href={'/app/profile'}>
              <UserCircleIcon />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={'/app/dashboard'}>
              <HomeIcon />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="-mx-2" />
          <DropdownMenuItem
            onClick={async () => {
              await onSignOut(undefined);
              router.replace('/auth/signin');
            }}
          >
            <LogOutIcon />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
