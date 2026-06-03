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
        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
        <section className="relative hidden overflow-hidden border-l bg-neutral-50 lg:flex">
          {/* GRID BACKGROUND */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:5rem_5rem]" />

          {/* SOFT GLOW */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/5 blur-3xl" />

          {/* ANIMATED SHAPES */}
          <div className="absolute left-24 top-24 h-28 w-28 animate-pulse rounded-full border border-black/10 bg-white" />

          <div className="absolute bottom-20 right-24 h-40 w-40 animate-bounce rounded-full border border-black/5 bg-white/80 [animation-duration:5s]" />

          <div className="absolute left-1/2 top-1/3 h-20 w-20 animate-ping rounded-full bg-black/5 [animation-duration:4s]" />

          {/* FLOATING UI CARD */}
          <div className="relative z-10 flex flex-1 items-center justify-center p-10">
            <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="space-y-4">
                <div className="h-3 w-24 rounded-full bg-neutral-200" />

                <div className="space-y-3">
                  <div className="h-14 rounded-2xl bg-neutral-100" />
                  <div className="h-14 rounded-2xl bg-neutral-100" />
                  <div className="h-14 rounded-2xl bg-neutral-100" />
                </div>

                <div className="pt-4">
                  <div className="h-12 rounded-full bg-black" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
