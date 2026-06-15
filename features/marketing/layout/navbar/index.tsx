"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import {
  Heart,
  HomeIcon,
  type LucideIcon,
  Search,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";

export function Navbar() {
  return (
    <>
      <div className="md:hidden sticky top-0 z-10">
        <MobileNav />
      </div>
      <div className="hidden md:block sticky top-0 z-10 bg-white shadow-xs pt-2">
        <DesktopNav />
      </div>
    </>
  );
}
