import { Suspense } from "react";
import { CategoriesWithProducts } from "../components/categories-with-products";
import { getAllCategories } from "../server/categories.query";

export function CategoryPage() {
  return (
    <div>
      <Suspense fallback={<div>pending...</div>}>
        <Categories />
      </Suspense>
    </div>
  );
}

async function Categories() {
  const categories = await getAllCategories();

  return <CategoriesWithProducts categories={categories} />;
}
