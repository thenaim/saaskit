import React, { Fragment, ReactNode } from 'react';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbItem,
} from '@repo/ui/components/ui/breadcrumb';
import Link from 'next/link';

interface Props {
  breadcrumbs?: {
    title: string;
    href?: string;
  }[];
  title: string;
  endContent?: ReactNode;
}

const PageHeader = ({ breadcrumbs, title, endContent }: Props) => {
  return (
    <div>
      {breadcrumbs && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              if (index !== breadcrumbs.length - 1) {
                return (
                  <Fragment key={item.title + index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={item.href as string}>{item.title}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </Fragment>
                );
              }
              return (
                <BreadcrumbItem key={item.title + index}>
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        // <div>
        //   <nav className="sm:hidden" aria-label="Back">
        //     <Link href={breadcrumbs[0]?.href} color="foreground" size="sm">
        //       <ChevronLeftIcon
        //         className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
        //         aria-hidden="true"
        //       />
        //       Back
        //     </Link>
        //   </nav>

        //   <nav className="hidden sm:flex" aria-label="Breadcrumb">
        //     <ol role="list" className="flex items-center space-x-2">
        //       {breadcrumbs.map((item, index) => (
        //         <li key={item.href}>
        //           <div className={clsx('flex', index > 0 && 'items-center')}>
        //             {index > 0 && (
        //               <ChevronRightIcon
        //                 className="h-5 w-5 flex-shrink-0 text-gray-400"
        //                 aria-hidden="true"
        //               />
        //             )}

        //             <Link
        //               href={item.href}
        //               isDisabled={index === breadcrumbs.length - 1}
        //               color="foreground"
        //               size="sm"
        //               className={clsx(index && 'ml-2')}
        //             >
        //               {item.title}
        //             </Link>
        //           </div>
        //         </li>
        //       ))}
        //     </ol>
        //   </nav>
        // </div>
      )}
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
        </div>
        {endContent && (
          <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0 gap-x-2">
            {endContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
