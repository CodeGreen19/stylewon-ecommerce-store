import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { ProductCard } from "../../shared/components/product-card";
import { SectionTitle } from "../../shared/components/section-title";
import { getProductsByCategoryName } from "../server/home.query";

export function TopSellingsSection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopSellingsSectionListing />
    </Suspense>
  );
}

async function TopSellingsSectionListing() {
  const res = await getProductsByCategoryName("Top sellings");

  return (
    <section className=" py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle title="Top sellings" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {res.map(({ product }) => (
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
