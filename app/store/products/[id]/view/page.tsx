import { ViewProductPage } from "@/features/store/products/pages/view-product-page";
import React from "react";

export default function page(props: PageProps<"/store/products/[id]/view">) {
  return <ViewProductPage {...props} />;
}
