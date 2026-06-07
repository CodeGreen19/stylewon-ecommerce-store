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
import { CloudSun, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
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
      <SidebarHeader className="h-14 pl-4 text-2xl font-black flex items-start justify-end">
        {isCollapsed ? "S" : "Stylewon"}
      </SidebarHeader>
      <SidebarContent className="p-2 group-data-[state=collapsed]:p-0">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {storeSidebarMenu.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  render={<Link href={item.url} />}
                  className={cn(
                    "px-4 py-5 text-muted-foreground hover:bg-secondary",
                    pathname.startsWith(item.url)
                      ? "bg-primary text-black hover:bg-primary hover:text-black active:bg-primary active:text-black"
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

function ToggleMode() {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <CloudSun
        onClick={() => {
          if (theme && theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      />
    </div>
  );
}
