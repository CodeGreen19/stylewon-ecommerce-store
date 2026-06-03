"use client";
import { Button } from "@/components/ui/button";
import { ProductCard, products } from "../../shared/components/product-card";
import { SectionTitle } from "../../shared/components/section-title";

export function YouMightLike() {
  return (
    <section className=" py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle title="You Might Also Like" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
