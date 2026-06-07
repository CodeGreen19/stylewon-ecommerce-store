import { ProductDetailsPage } from "@/features/marketing/products/pages/product-details-page";
import { Suspense } from "react";

export default function page(props: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<div>LOading..</div>}>
      <ProductDetailsPage {...props} />
    </Suspense>
  );
}
