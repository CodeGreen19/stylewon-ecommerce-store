"use client";

import { Logo } from "@/components/logo";
import { ThermometerSunIcon } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Company",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    title: "Help",
    links: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "Resources",
    links: [
      "Free eBooks",
      "Development Tutorial",
      "How to - Blog",
      "Youtube Playlist",
    ],
  },
];

const paymentMethods = ["VISA", "Mastercard", "PayPal", "Apple Pay"];

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        {/* TOP */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          {/* BRAND */}
          <div className="max-w-sm">
            <Logo />

            <p className="mt-6 text-sm leading-7 text-black/60">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>

            {/* SOCIAL */}
            <div className="mt-8 flex items-center gap-3">
              <SocialButton icon={ThermometerSunIcon} />
              <SocialButton icon={ThermometerSunIcon} active />
              <SocialButton icon={ThermometerSunIcon} />
              <SocialButton icon={ThermometerSunIcon} />
            </div>
          </div>

          {/* LINKS */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
                {section.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-sm text-black/60 transition hover:text-black"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="mt-14 flex flex-col gap-6 border-t border-black/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-black/60">
            Shop.co © 2000-2023, All Rights Reserved
          </p>

          {/* PAYMENTS */}
          <div className="flex flex-wrap items-center gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="flex h-11 min-w-[70px] items-center justify-center rounded-lg bg-white px-4 text-xs font-semibold shadow-sm"
              >
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

interface SocialButtonProps {
  icon: React.ElementType;
  active?: boolean;
}

function SocialButton({ icon: Icon, active }: SocialButtonProps) {
  return (
    <button
      className={`flex size-10 items-center justify-center rounded-full border transition ${
        active
          ? "border-black bg-black text-white"
          : "border-black/20 bg-white text-black hover:bg-black hover:text-white"
      }`}
    >
      <Icon className="size-4" />
    </button>
  );
}
