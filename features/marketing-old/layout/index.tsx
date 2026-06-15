import React from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function MarketingLayout(props: LayoutProps<"/">) {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-[calc(100vh-16rem)]">{props.children}</div>
      <Footer />
    </div>
  );
}
