import { ProductDetailsPage } from "@/features/marketing/products/pages/product-details-page";
import { Suspense } from "react";

export default function page(props: PageProps<"/products/[slug]">) {
  return <ProductDetailsPage {...props} />;
}
