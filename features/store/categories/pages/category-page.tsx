import { Suspense } from "react";
import { CategoriesListings } from "../components/category-listing";
import { getAllCategories } from "../server/categories.query";
import CategoryListingSkeleton from "../components/categrory-listing-skeleton";

export function CategoryPage() {
  return (
    <div>
      <Suspense fallback={<CategoryListingSkeleton />}>
        <Categories />
      </Suspense>
    </div>
  );
}

async function Categories() {
  const categories = await getAllCategories();

  return <CategoriesListings categories={categories} />;
}
