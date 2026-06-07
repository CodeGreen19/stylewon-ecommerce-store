"use client";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "mb-14 text-center text-3xl font-black uppercase tracking-tight md:text-4xl",
        className,
      )}
    >
      {title}
    </h2>
  );
}
