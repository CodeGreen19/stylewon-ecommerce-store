"use client";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

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
