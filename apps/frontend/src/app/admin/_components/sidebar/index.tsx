'use client';

import { Button } from '@repo/ui/components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@repo/ui/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@repo/ui/components/ui/sidebar';
import { BellIcon, ChevronRightIcon, Package2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  adminMainNavigation,
  adminTopNavigation,
} from '../../layout.navigation';

export function AdminLayoutSidebar() {
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
            {adminTopNavigation.map((item) => (
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

                {/* <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  className="text-sidebar-foreground/70"
                >
                  <Link href={item.href}>
                    {item.icon && (
                      <item.icon className="text-sidebar-foreground/70" />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton> */}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="py-0">
          <SidebarMenu>
            {adminMainNavigation.map((item) => {
              const someOfChildrenIsActive = item.children.some((someItem) =>
                pathname.startsWith(someItem.href),
              );
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={true}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <Button
                        size={'sm'}
                        variant={someOfChildrenIsActive ? 'secondary' : 'ghost'}
                        className="w-full justify-start px-2"
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </Button>
                      {/* <SidebarMenuButton
                        tooltip={item.title}
                        isActive={someOfChildrenIsActive}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton> */}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="mr-0 pr-0">
                        {item.children?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <Button
                              asChild
                              size={'sm'}
                              variant={
                                pathname.startsWith(subItem.href)
                                  ? 'secondary'
                                  : 'ghost'
                              }
                              className="w-full justify-start px-2"
                            >
                              <Link href={subItem.href}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </Button>
                            {/* <SidebarMenuSubButton
                              asChild
                              isActive={pathname.startsWith(subItem.href)}
                            >
                              <Link href={subItem.href}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton> */}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
