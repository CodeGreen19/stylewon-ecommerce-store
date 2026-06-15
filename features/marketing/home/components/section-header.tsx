import React, { ReactNode } from "react";

export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <h1 className="py-8 text-2xl uppercase md:text-3xl font-black text-center">
      {children}
    </h1>
  );
}
