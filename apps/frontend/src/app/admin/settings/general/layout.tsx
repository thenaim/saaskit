'use client';
import {
  CreditCardIcon,
  GlobeIcon,
  MailIcon,
  MonitorCogIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import PageHeader from '@/src/components/page-header';
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@repo/ui/components/ui/scroll-area';
import Link from 'next/link';
import { useMemo } from 'react';
import { adminGeneralSettingsNavigation } from './layout.navigation';

export default function AdminGeneralSettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const defaultValue = useMemo(
    () =>
      adminGeneralSettingsNavigation.find((item) =>
        pathname.startsWith(item.href),
      )?.id,
    [pathname],
  );
  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto py-6 px-4 md:px-6 lg:px-8 gap-y-6 overflow-hidden">
      <PageHeader title={`General Settings`} />
      <ScrollArea className="pb-2">
        <Tabs value={defaultValue} className="w-full relative h-12">
          <TabsList className="flex items-center justify-start flex-row h-full">
            {adminGeneralSettingsNavigation.map((item) => (
              <TabsTrigger
                asChild
                key={item.id}
                value={item.id}
                className="w-full h-full"
              >
                <Link href={item.href}>
                  {item?.icon ? <item.icon className="size-5 mr-2" /> : null}
                  {item.title}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {children}
    </div>
  );
}
