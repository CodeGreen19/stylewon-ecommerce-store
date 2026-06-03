"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    value: "200+",
    label: "International Brands",
  },
  {
    value: "2,000+",
    label: "High-Quality Products",
  },
  {
    value: "30,000+",
    label: "Happy Customers",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f2f0f1]">
      <div className="mx-auto grid min-h-[720px] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-0">
        {/* LEFT CONTENT */}
        <div className="relative z-10 flex flex-col items-start justify-center">
          <h1 className="max-w-xl text-5xl font-black uppercase leading-[0.9] tracking-tight text-black sm:text-6xl md:text-7xl">
            Find Clothes
            <br />
            That Matches
            <br />
            Your Style
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600 sm:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Button
            size="lg"
            className="mt-8 h-14 rounded-full px-10 text-base font-medium"
          >
            Shop Now
            <ArrowRight className="ml-2 size-5" />
          </Button>

          {/* STATS */}
          <div className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col ${
                  index !== 0 ? "sm:border-l sm:border-neutral-300 sm:pl-8" : ""
                }`}
              >
                <span className="text-4xl font-bold tracking-tight text-black">
                  {item.value}
                </span>

                <span className="mt-1 text-sm text-neutral-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex h-full min-h-[500px] items-end justify-center">
          {/* PRODUCT IMAGE */}
          <div className="relative h-[500px] w-full max-w-[520px] sm:h-[620px] lg:h-[720px]">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1400&auto=format&fit=crop"
              alt="Fashion Product"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 104 104"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M52 0L63.5 40.5L104 52L63.5 63.5L52 104L40.5 63.5L0 52L40.5 40.5L52 0Z" />
    </svg>
  );
}
