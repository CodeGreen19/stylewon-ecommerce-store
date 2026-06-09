"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { storeSidebarMenu } from "@/constants/store-sidebar-menu-item";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, Suspense } from "react";
import { StoreUser } from "./store-user";

export function StoreSidebar(props: ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="text-2xl uppercase font-bold tracking-tight pl-4 h-14  flex items-start justify-center">
        {isCollapsed ? "S" : "Store"}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {storeSidebarMenu.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  render={<Link href={item.url} />}
                  className={cn(
                    " text-muted-foreground hover:bg-transparent hover:text-foreground",
                    pathname.startsWith(item.url)
                      ? "bg-secondary text-foreground hover:bg-secondary hover:text-foreground active:bg-secondary active:text-foreground"
                      : "",
                  )}
                >
                  {item.icon && <item.icon />} <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Suspense>
          <StoreUser
            user={{ name: "Ahmed", email: "ahmed@gmail.com", avatar: "" }}
          />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
