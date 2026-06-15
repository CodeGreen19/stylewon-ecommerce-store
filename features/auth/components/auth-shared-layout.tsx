// components/auth/auth-layout.tsx

import { Logo } from "@/components/logo";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkHref: string;
}

export function AuthLayout({
  title,
  description,
  children,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Logo />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>

              <p className="text-sm leading-6 text-neutral-500">
                {description}
              </p>
            </div>

            <div className="mt-8">{children}</div>

            <p className="mt-8 text-sm text-neutral-500">
              {bottomText}{" "}
              <Link
                href={bottomLinkHref}
                className="font-medium text-black underline underline-offset-4"
              >
                {bottomLinkText}
              </Link>
            </p>
          </div>
        </section>

        <section className="relative hidden overflow-hidden border-l lg:flex bg-gray-50">
          <div className="grid h-full w-full grid-cols-12 grid-rows-12">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border-[0.5px] border-dashed border-neutral-200 transition-colors hover:bg-primary/80"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
