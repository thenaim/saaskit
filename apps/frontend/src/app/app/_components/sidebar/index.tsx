'use client';

import { Button } from '@repo/ui/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@repo/ui/components/ui/sidebar';
import { BellIcon, Package2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { appTopNavigation } from '../../layout.navigation';

export function AppLayoutSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="p-0">
        <div className="flex min-h-12 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2Icon className="size-6" />
            <span>Hello World</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <BellIcon className="size-5" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden pb-0">
          <SidebarMenu>
            {appTopNavigation.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Button
                  asChild
                  size={'sm'}
                  variant={
                    pathname.startsWith(item.href) ? 'secondary' : 'ghost'
                  }
                  className="w-full justify-start px-2"
                >
                  <Link href={item.href}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </Button>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
