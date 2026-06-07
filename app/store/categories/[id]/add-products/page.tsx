import { CategoryAddProductsPage } from "@/features/store/categories/pages/category-add-products-page";
import React from "react";

export default function page(
  props: PageProps<"/store/categories/[id]/add-products">,
) {
  return <CategoryAddProductsPage {...props} />;
}
