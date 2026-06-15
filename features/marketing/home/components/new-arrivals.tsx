import React, { Suspense } from "react";
import { SectionHeader } from "./section-header";
import { getProductsByCategoryName } from "../server/home.query";
import {
  ProductCard,
  ProductCardSkeleton,
} from "../../components/product-card";

export default function NewArrivals() {
  return (
    <section>
      <SectionHeader>New Arrivals</SectionHeader>
      <Suspense fallback={<ProductsLoading />}>
        <Products />
      </Suspense>
    </section>
  );
}

async function Products() {
  const products = await getProductsByCategoryName("shirts");
  if (products.length === 0) {
    return (
      <div className="h-20 w-full border flex items-center justify-center">
        No products !
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
      {products.map((data) => (
        <ProductCard key={data.productId} product={data.product} />
      ))}
    </div>
  );
}
async function ProductsLoading() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
