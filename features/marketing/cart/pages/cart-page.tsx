// app/cart/page.tsx

"use client";

import Image from "next/image";
import {
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const cartItems = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    image: "/products/product-1.png",
  },
  {
    id: 2,
    name: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    image: "/products/product-5.png",
  },
  {
    id: 3,
    name: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    image: "/products/product-4.png",
  },
];

export function CartPage() {
  return (
    <main className="max-w-7xl m-auto py-6 px-4 lg:py-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>

        <ChevronRight className="h-4 w-4" />

        <span className="font-medium text-primary">Cart</span>
      </div>

      {/* Title */}
      <h1 className="mb-8 text-3xl font-black uppercase tracking-tight md:text-5xl">
        Your Cart
      </h1>

      {/* Main Layout */}
      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        {/* Cart Items */}
        <div className="rounded-[24px] border">
          {cartItems.map((item, index) => (
            <div key={item.id}>
              <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                {/* Left */}
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative h-[110px] w-[100px] shrink-0 overflow-hidden rounded-[14px] bg-[#F0EEED]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold leading-tight">
                      {item.name}
                    </h2>

                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <p>
                        Size:{" "}
                        <span className="text-foreground">{item.size}</span>
                      </p>

                      <p>
                        Color:{" "}
                        <span className="text-foreground">{item.color}</span>
                      </p>
                    </div>

                    <p className="mt-4 text-2xl font-bold">${item.price}</p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-end justify-between sm:h-full sm:flex-col">
                  {/* Delete */}
                  <button className="ml-auto text-red-500 transition hover:opacity-70">
                    <Trash2 className="h-5 w-5" />
                  </button>

                  {/* Quantity */}
                  <div className="flex h-[44px] items-center justify-between rounded-full bg-[#F0F0F0] px-5 sm:w-[126px]">
                    <button className="transition hover:opacity-70">
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="text-sm font-medium">1</span>

                    <button className="transition hover:opacity-70">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {index !== cartItems.length - 1 && <Separator />}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <aside className="h-fit rounded-[24px] border p-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          {/* Summary */}
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-lg text-muted-foreground">Subtotal</span>

              <span className="text-lg font-bold">$565</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg text-muted-foreground">
                Discount (-20%)
              </span>

              <span className="text-lg font-bold text-red-500">-$113</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg text-muted-foreground">
                Delivery Fee
              </span>

              <span className="text-lg font-bold">$15</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-xl font-medium">Total</span>

              <span className="text-3xl font-bold">$467</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Add promo code"
                className="h-[48px] rounded-full border-0 bg-[#F0F0F0] pl-11 shadow-none focus-visible:ring-0"
              />
            </div>

            <Button className="h-[48px] rounded-full px-8">Apply</Button>
          </div>

          {/* Checkout */}
          <Button className="mt-6 h-[56px] w-full rounded-full text-base font-medium">
            Go to Checkout
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </aside>
      </section>
    </main>
  );
}
