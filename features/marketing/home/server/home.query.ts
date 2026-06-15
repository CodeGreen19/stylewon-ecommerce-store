"use server";

import { db } from "@/drizzle/db";
import { categories, productsToCategories } from "@/drizzle/schema";
import { eq, ilike } from "drizzle-orm";

export async function getProducts() {
  return await db.query.products.findMany();
}
export async function getProductsByCategoryName(categoryName: string) {
  const [category] = await db
    .select()
    .from(categories)
    .where(ilike(categories.name, categoryName));
  if (!category) {
    return [];
  }
  return await db.query.productsToCategories.findMany({
    where: eq(productsToCategories.categoryId, category.id),
    with: { product: true },
  });
}
