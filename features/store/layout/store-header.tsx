"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { storeSidebarMenu } from "@/constants/store-sidebar-menu-item";
import { findBreadcrumbs } from "@/helpers/find-breadcrumbs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function StoreHeader() {
  const pathname = usePathname();
  const breadcrumbList = findBreadcrumbs(storeSidebarMenu, pathname);

  return (
    <header className="h-12 flex items-center justify-start gap-2 px-2">
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbList.map((item, index) => (
            <Fragment key={item.url}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={
                    <Link href={item.url.includes("[") ? "" : item.url} />
                  }
                >
                  {item.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbList.length - 1 !== index && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
