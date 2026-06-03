// app/(shop)/product/[slug]/page.tsx

"use client";

import Image from "next/image";
import { Minus, Plus, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ProductInfo } from "../components/product-info";
import { YouMightLike } from "../components/you-might-like";

const galleryImages = ["", "", ""];

const sizes = ["Small", "Medium", "Large", "X-Large"];

const colors = [
  {
    name: "Brown",
    value: "#4F4631",
  },
  {
    name: "Green",
    value: "#314F4A",
  },
  {
    name: "Navy",
    value: "#31344F",
  },
];

export function ProductDetailsPage() {
  return (
    <main className="px-4 py-6 lg:py-10 max-w-7xl xl:px-0 m-auto">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>

        <ChevronRight className="h-4 w-4" />

        <span>Shop</span>

        <ChevronRight className="h-4 w-4" />

        <span>Men</span>

        <ChevronRight className="h-4 w-4" />

        <span className="font-medium text-primary">T-shirts</span>
      </div>

      {/* Main Section */}
      <section className="grid gap-10 lg:grid-cols-[140px_1fr_520px]">
        {/* Left Thumbnail Images */}
        <div className="order-2 flex gap-4 lg:order-1 lg:flex-col">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative h-[111px] w-[111px] overflow-hidden rounded-[20px] border bg-[#F0EEED]",
                index === 0 && "border-black",
              )}
            >
              <Image src={image} alt="Product" fill className="object-cover" />
            </button>
          ))}
        </div>

        {/* Main Product Image */}
        <div className="order-1 overflow-hidden rounded-[20px] bg-[#F0EEED] lg:order-2">
          <div className="relative aspect-square w-full">
            <Image
              src="/products/tshirt-main.png"
              alt="Product"
              fill
              priority
              className="object-contain p-6"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="order-3">
          {/* Title */}
          <h1 className="text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl">
            One Life Graphic T-shirt
          </h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5 fill-yellow-400 text-yellow-400",
                    i === 4 && "fill-yellow-400/50",
                  )}
                />
              ))}
            </div>

            <p className="text-sm text-muted-foreground">4.5/5</p>
          </div>

          {/* Price */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-4xl font-bold">$260</span>

            <span className="text-4xl font-bold text-muted-foreground line-through">
              $300
            </span>

            <div className="rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-500">
              -40%
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 max-w-[520px] text-base leading-7 text-muted-foreground">
            This graphic t-shirt which is perfect for any occasion. Crafted from
            a soft and breathable fabric, it offers superior comfort and style.
          </p>

          <Separator className="my-7" />

          {/* Colors */}
          <div>
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              Select Colors
            </p>

            <div className="flex items-center gap-4">
              {colors.map((color, index) => (
                <button
                  key={color.name}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-105",
                    index === 0 && "ring-2 ring-offset-2",
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  {index === 0 && (
                    <div className="h-2.5 w-2.5 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <Separator className="my-7" />

          {/* Sizes */}
          <div>
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              Choose Size
            </p>

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={size === "Large" ? "default" : "secondary"}
                  className={cn(
                    "h-11 rounded-full px-7",
                    size === "Large"
                      ? "bg-black text-white hover:bg-black/90"
                      : "bg-[#F0F0F0] text-muted-foreground hover:bg-[#E7E7E7]",
                  )}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <Separator className="my-7" />

          {/* Add To Cart */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Quantity */}
            <div className="flex h-[52px] items-center justify-between rounded-full bg-[#F0F0F0] px-5 sm:w-[170px]">
              <button className="transition hover:opacity-70">
                <Minus className="h-5 w-5" />
              </button>

              <span className="text-base font-medium">1</span>

              <button className="transition hover:opacity-70">
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Button */}
            <Button className="h-[52px] flex-1 rounded-full bg-black text-base font-medium text-white hover:bg-black/90">
              Add to Cart
            </Button>
          </div>
        </div>
      </section>
      <section>
        <ProductInfo />
      </section>
      <section>
        <YouMightLike />
      </section>
    </main>
  );
}
