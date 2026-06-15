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

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  LogOut,
  LucideIcon,
  MapPinHouse,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type AccountLink = {
  label: string;
  icon: LucideIcon;
  link?: string;
  isSignOutBtn?: boolean;
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
    label: "Address",
    link: "/account/address",
    icon: MapPinHouse,
  },

  {
    label: "Signout",
    isSignOutBtn: true,
    icon: LogOut,
  },
];

export function AccountLayout(props: LayoutProps<"/account">) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-10">
      <div className="overflow-hidden p-0 max-w-7xl m-auto">
        <SidebarProvider className="items-start gap-4 ">
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
                        <SidebarMenuButton
                          className={cn(
                            item.isSignOutBtn ? "text-destructive" : "",
                          )}
                          onClick={async () => {
                            if (item.isSignOutBtn) {
                              await authClient.signOut({
                                fetchOptions: {
                                  onSuccess: () => router.push("/"),
                                },
                              });
                            }
                          }}
                          render={
                            <Link href={item.link ?? ""}>
                              <item.icon />
                              <span>{item.label}</span>
                            </Link>
                          }
                          isActive={
                            item.link && pathname.startsWith(item.link)
                              ? true
                              : false
                          }
                        ></SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <main className="flex flex-1 flex-col mt-6 bg-white">
            <div>{props.children}</div>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
