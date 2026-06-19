"use client";

import { Logo } from "@/components/logo";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  List,
  LucideIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import { UserButton } from "./user-button";
import { CartSheet } from "../../cart/components/cart-sheet";
import { ProductSearch } from "./product-search";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { staticCategoris } from "../constants";
import { useRouter } from "next/navigation";

export function MobileNav() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="bg-white sticky top-0 shadow-xs">
      <div className="flex items-center justify-between px-4 pt-2">
        <Logo />
        <Navmenu />
      </div>
      <div className="px-4">
        <ProductSearch />
      </div>
      <div>
        <Navitems />
      </div>
    </div>
  );
}

type NavItem = {
  label: string;
  icon: LucideIcon;
};
const items: NavItem[] = [
  { label: "Home", icon: HomeIcon },

  {
    label: "Categories",
    icon: List,
  },
  { label: "Cart", icon: ShoppingCartIcon },
  { label: "Account", icon: UserIcon },
];
function Navitems() {
  return (
    <div className="flex items-center  justify-between px-6 py-4 z-100   fixed bottom-0 left-0 w-full bg-white border-t border-t-gray-200">
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

function NavItem({ icon: Icon, label }: NavItem) {
  return (
    <div className={cn("flex items-center flex-col gap-0.1")}>
      <Icon className="size-5" />
      <span className="text-xs">{label}</span>
    </div>
  );
}

function Navmenu() {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger
        nativeButton={false}
        render={
          <div className="flex gap-1 flex-col">
            <div className="w-10 h-1 bg-black"></div>
            <div className="w-10 h-1 bg-black"></div>
          </div>
        }
      ></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ul className="px-4">
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
      </SheetContent>
    </Sheet>
  );
}
