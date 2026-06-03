"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Heart, Menu, Search, ShoppingCart, UserCircle } from "lucide-react";
import { UserButtonWrapper } from "./user-button";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Products",
    href: "/products",
  },

  {
    label: "Deals",
    href: "/deals",
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <MobileNav />
      <DesktopNav />
    </header>
  );
}

function MobileNav() {
  return (
    <nav className="flex h-16 items-center justify-between px-4 md:hidden">
      <div className="flex items-center gap-2">
        <MobileMenu />
        <Logo />
      </div>
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} size={"icon"}>
          <Search className="size-5" />
        </Button>

        <Button
          nativeButton={false}
          render={<Link href={"/cart"} />}
          size={"icon"}
          variant={"ghost"}
        >
          <ShoppingCart className="size-5" />
        </Button>
        <UserButtonWrapper type="MOBILE">
          <UserCircle className="size-5" />
        </UserButtonWrapper>
      </div>
    </nav>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="icon" variant="ghost">
            <Menu className="size-5" />
          </Button>
        }
      />

      <SheetContent side="left" className="w-75 p-0">
        <SheetHeader className="border-b px-6 py-4 text-left">
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// =============== DESKTOP NAV =================================

function DesktopNav() {
  return (
    <nav className="hidden h-20 items-center justify-between px-6 xl:px-0 md:flex max-w-7xl m-auto">
      <div className="flex items-center gap-10">
        <Logo />
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-[320px]">
          <SearchInput />
        </div>
        <DesktopActions />
      </div>
    </nav>
  );
}

function DesktopActions() {
  return (
    <div className="flex items-center gap-1">
      <Button size={"icon"} variant={"ghost"}></Button>
      <Button
        nativeButton={false}
        render={<Link href={"/account/wishlists"} />}
        size={"icon"}
        variant={"ghost"}
      >
        <Heart className="size-5" />
      </Button>
      <Button
        nativeButton={false}
        render={<Link href={"/cart"} />}
        size={"icon"}
        variant={"ghost"}
      >
        <ShoppingCart className="size-5" />
      </Button>
      <UserButtonWrapper type="DESKTOP">
        <UserCircle className="size-5" />
      </UserButtonWrapper>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Search products..." className="pl-9" />
    </div>
  );
}
