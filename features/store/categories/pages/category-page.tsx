import { Suspense } from "react";
import { CategoriesListings } from "../components/category-listing";
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

  return <CategoriesListings categories={categories} />;
}
