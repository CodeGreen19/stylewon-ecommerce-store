"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import React from "react";

import {
  CreditCard,
  Heart,
  LucideIcon,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type AccountLink = {
  label: string;
  icon: LucideIcon;
  link?: string;
  isButtton?: boolean;
};

export const accountLinks: AccountLink[] = [
  {
    label: "Profile",
    link: "/account/profile",
    icon: User,
  },
  {
    label: "Orders",
    link: "/account/orders",
    icon: ShoppingBag,
  },
  {
    label: "Wishlists",
    link: "/account/wishlists",
    icon: Heart,
  },
  {
    label: "Settings",
    link: "/account/settings",
    icon: Settings,
  },
  {
    label: "Signout",
    isButtton: true,
    icon: Settings,
  },
];

export function AccountLayout(props: LayoutProps<"/account">) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="overflow-hidden p-0 max-w-7xl m-auto">
        <SidebarProvider className="items-start ">
          <Sidebar
            collapsible="none"
            variant="floating"
            className="hidden md:flex mt-6 bg-background"
          >
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {accountLinks.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        {item.link && (
                          <SidebarMenuButton
                            render={
                              <Link href={item.label}>
                                <item.icon />
                                <span>{item.label}</span>
                              </Link>
                            }
                            isActive={pathname.startsWith(item.link)}
                          ></SidebarMenuButton>
                        )}
                        {item.isButtton && (
                          <SidebarMenuButton
                            render={
                              <Button
                                key={item.label}
                                onClick={() => {
                                  if (item.label === "Signout") {
                                    authClient.signOut({
                                      fetchOptions: {
                                        onSuccess: () => {
                                          router.push("/");
                                        },
                                      },
                                    });
                                  }
                                }}
                              >
                                <item.icon />
                                <span>{item.label}</span>
                              </Button>
                            }
                          ></SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            {" "}
            <main className="flex flex-1 flex-col mt-6 ">
              <div>{props.children}</div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
