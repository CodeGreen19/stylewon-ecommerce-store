import React from "react";
import { MobileNav } from "./mobile-nav";
import { DeskTopNav } from "./desktop-nav";

export function Navbar() {
  return (
    <div>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:block">
        <DeskTopNav />
      </div>
    </div>
  );
}
