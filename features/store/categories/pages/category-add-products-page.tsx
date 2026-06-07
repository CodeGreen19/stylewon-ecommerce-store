import { Suspense } from "react";
import { SingleCategoryHeader } from "../components/single-category-header";
import { getProductsByCategory } from "../server/single.category.action";
import { SingleCategoryProducts } from "../components/single-category-products";

export function CategoryAddProductsPage(
  props: PageProps<"/store/categories/[id]/add-products">,
) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryAddProducts {...props} />
    </Suspense>
  );
}

async function CategoryAddProducts(
  props: PageProps<"/store/categories/[id]/add-products">,
) {
  const categoryId = (await props.params).id;
  const res = await getProductsByCategory(categoryId);
  if (!res) return null;
  return (
    <div className="space-y-6">
      <SingleCategoryHeader
        categoryId={res.id}
        categoryName={res.name}
        productsCount={res.products.length}
      />
      <SingleCategoryProducts info={{ products: res.products }} />
    </div>
  );
}
