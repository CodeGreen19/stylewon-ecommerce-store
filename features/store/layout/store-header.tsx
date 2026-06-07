"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { storeSidebarMenu } from "@/constants/store-sidebar-menu-item";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function StoreHeader() {
  const pathname = usePathname();
  const selected = storeSidebarMenu.find((value) =>
    pathname.startsWith(value.url),
  );
  return (
    <header className="h-14 flex items-center justify-start gap-2 px-2">
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href={selected?.url || "/store/dashboard"} />}
            >
              {selected?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
