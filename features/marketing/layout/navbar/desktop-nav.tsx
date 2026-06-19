"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { LucideIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { useState } from "react";

export function DesktopNav() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="px-4 xl:px-0 max-w-7xl m-auto space-y-1.5">
      <div className="flex items-center justify-between pt-3 gap-10">
        <Logo />

        <ProductSearch />

        <Navitems />
      </div>
      <NavigationMenuDemo />
    </div>
  );
}

type NavItem = {
  label: string;
  icon: LucideIcon;
};
const items: NavItem[] = [
  { label: "Cart", icon: ShoppingCartIcon },
  { label: "Account", icon: UserIcon },
];
function Navitems() {
  return (
    <div className="flex items-center justify-between gap-2">
      {items.map((item) =>
        item.label === "Account" ? (
          <UserButton key={item.label}>
            <NavItem icon={item.icon} label={item.label} />
          </UserButton>
        ) : item.label === "Cart" ? (
          <CartSheet key={item.label}>
            <NavItem icon={item.icon} label={item.label} />
          </CartSheet>
        ) : (
          <NavItem key={item.label} icon={item.icon} label={item.label} />
        ),
      )}
    </div>
  );
}

function NavItem({ icon: Icon }: NavItem) {
  return (
    <div
      className={cn(
        "flex items-center flex-col gap-0.1 p-3 hover:bg-accent-foreground",
      )}
    >
      <Icon className="size-5" />
    </div>
  );
}

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CartSheet } from "../../cart/components/cart-sheet";
import { ProductSearch } from "./product-search";
import { UserButton } from "./user-button";
import { useRouter } from "next/navigation";
import { staticCategoris } from "../constants";

export function NavigationMenuDemo() {
  const router = useRouter();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              {staticCategoris.map((cat) => (
                <li
                  key={cat.label}
                  onClick={() => router.push(`?category=${cat.tag}`)}
                  className="p-2 hover:bg-accent-foreground cursor-pointer"
                >
                  {cat.label}
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/products">All Products</Link>}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
