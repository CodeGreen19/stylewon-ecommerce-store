// app/(shop)/casual/page.tsx

import { ChevronRight, SlidersHorizontal, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Product, ProductCard } from "../../shared/components/product-card";

const products: Product[] = [
  {
    id: 1,
    title: "Wireless Noise-Canceling Headphones",
    rating: 4.8,
    price: 299.99,
    oldPrice: 349.99,
    discount: 14,
  },
  {
    id: 2,
    title: "Ergonomic Mechanical Keyboard",
    rating: 4.5,
    price: 129.99,
  },
  {
    id: 3,
    title: 'Ultra-Wide Gaming Monitor 34"',
    rating: 4.7,
    price: 449.99,
    oldPrice: 499.99,
    discount: 10,
  },
  {
    id: 4,
    title: "Smart Fitness Watch v2",
    rating: 4.2,
    price: 199.99,
  },
  {
    id: 5,
    title: "Portable Bluetooth Speaker",
    rating: 4.6,
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
  },
  {
    id: 6,
    title: "Stainless Steel Espresso Machine",
    rating: 4.9,
    price: 599.99,
  },
  {
    id: 7,
    title: "Minimalist Leather Backpack",
    rating: 4.4,
    price: 85.0,
    oldPrice: 110.0,
    discount: 22,
  },
  {
    id: 8,
    title: "4K Ultra HD Streaming Stick",
    rating: 4.3,
    price: 49.99,
  },
  {
    id: 9,
    title: "Chef's Knife - High Carbon Steel",
    rating: 4.8,
    price: 65.5,
    oldPrice: 75.0,
    discount: 13,
  },
  {
    id: 10,
    title: "Memory Foam Ergonomic Office Chair",
    rating: 4.1,
    price: 249.99,
  },
  {
    id: 11,
    title: "Smart LED Desk Lamp",
    rating: 4.5,
    price: 34.99,
    oldPrice: 45.0,
    discount: 22,
  },
  {
    id: 12,
    title: "Wireless Vertical Mouse",
    rating: 4.3,
    price: 39.99,
  },
  {
    id: 13,
    title: "Electric Toothbrush with Sonic Tech",
    rating: 4.7,
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
  },
  {
    id: 14,
    title: "Water-Resistant Windbreaker Jacket",
    rating: 4.2,
    price: 55.0,
  },
  {
    id: 15,
    title: "10,000mAh Compact Power Bank",
    rating: 4.6,
    price: 24.99,
    oldPrice: 29.99,
    discount: 16,
  },
  {
    id: 16,
    title: "Premium Soy Wax Scented Candle",
    rating: 4.5,
    price: 18.5,
  },
];

const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const dressStyles = ["Casual", "Formal", "Party", "Gym"];

const colors = [
  "#00C12B",
  "#F50606",
  "#F5DD06",
  "#F57906",
  "#06CAF5",
  "#063AF5",
  "#7D06F5",
  "#F506A4",
  "#FFFFFF",
  "#000000",
];

function FiltersContent() {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-4">
        {categories.map((item) => (
          <button
            key={item}
            className="flex w-full items-center justify-between text-sm text-muted-foreground transition hover:text-primary"
          >
            {item}
            <ChevronRight className="h-4 w-4" />
          </button>
        ))}
      </div>

      {/* Price */}
      <Accordion className="w-full">
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-0 text-base font-semibold hover:no-underline">
            Price
          </AccordionTrigger>

          <AccordionContent className="pt-5">
            <Slider defaultValue={[50, 200]} min={0} max={500} step={1} />

            <div className="mt-4 flex items-center justify-between text-sm font-medium">
              <span>$50</span>
              <span>$200</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Colors */}
      <Accordion className="w-full">
        <AccordionItem value="colors" className="border-b-0">
          <AccordionTrigger className="py-0 text-base font-semibold hover:no-underline">
            Colors
          </AccordionTrigger>

          <AccordionContent className="pt-5">
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className={cn(
                    "h-9 w-9 rounded-full border shadow-sm transition hover:scale-105",
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Sizes */}
      <Accordion className="w-full">
        <AccordionItem value="size" className="border-b-0">
          <AccordionTrigger className="py-0 text-base font-semibold hover:no-underline">
            Size
          </AccordionTrigger>

          <AccordionContent className="pt-5">
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={size === "Large" ? "default" : "secondary"}
                  className="rounded-full"
                >
                  {size}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Dress Style */}
      <Accordion className="w-full">
        <AccordionItem value="dress-style" className="border-b-0">
          <AccordionTrigger className="py-0 text-base font-semibold hover:no-underline">
            Dress Style
          </AccordionTrigger>

          <AccordionContent className="space-y-4 pt-5">
            {dressStyles.map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id={item} />
                  <label
                    htmlFor={item}
                    className="text-sm text-muted-foreground"
                  >
                    {item}
                  </label>
                </div>

                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="h-12 w-full rounded-full text-sm font-semibold">
        Apply Filter
      </Button>
    </div>
  );
}

export function ProductsPage() {
  return (
    <main className="max-w-7xl m-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>

        <ChevronRight className="h-4 w-4" />

        <span className="font-medium text-primary">Casual</span>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden w-73.75 shrink-0 rounded-3xl border p-6 lg:block">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>

            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>

          <FiltersContent />
        </aside>

        {/* Product Section */}
        <section className="flex-1">
          {/* Top Bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Casual</h1>

              {/* Mobile Filter */}

              <Sheet>
                <SheetTrigger
                  render={
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full lg:hidden"
                    >
                      <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                  }
                />

                <SheetContent side="bottom" className="w-full overflow-y-auto">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-left text-2xl">
                      Filters
                    </SheetTitle>
                  </SheetHeader>

                  <div className="px-4">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <p className="hidden text-sm text-muted-foreground md:block">
                Showing 1-10 of 100 Products
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        className="gap-2 px-0 text-sm font-semibold"
                      >
                        Most Popular
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    }
                  />

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Most Popular</DropdownMenuItem>

                    <DropdownMenuItem>Newest</DropdownMenuItem>

                    <DropdownMenuItem>Price: Low to High</DropdownMenuItem>

                    <DropdownMenuItem>Price: High to Low</DropdownMenuItem>

                    <DropdownMenuItem>Top Rated</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-between border-t pt-6">
            <Button variant="outline" className="rounded-full">
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <Button size="icon" variant="default" className="rounded-full">
                1
              </Button>

              <Button size="icon" variant="ghost" className="rounded-full">
                2
              </Button>

              <Button size="icon" variant="ghost" className="rounded-full">
                3
              </Button>

              <span className="px-2 text-muted-foreground">...</span>

              <Button size="icon" variant="ghost" className="rounded-full">
                8
              </Button>
            </div>

            <Button variant="outline" className="rounded-full">
              Next
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
