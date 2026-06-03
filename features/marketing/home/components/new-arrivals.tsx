"use client";
import { Button } from "@/components/ui/button";
import { ProductCard, products } from "../../shared/components/product-card";
import { SectionTitle } from "../../shared/components/section-title";

export function NewArrivalsSection() {
  return (
    <section className=" py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle title="New Arrivals" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button>View all</Button>
        </div>
      </div>
    </section>
  );
}
