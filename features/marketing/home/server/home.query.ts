"use server";

import { db } from "@/drizzle/db";
import { categories, products, productsToCategories } from "@/drizzle/schema";
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

export async function getSingleProductById(productId: string) {
  const [product] = await db.query.products.findMany({
    where: eq(products.id, productId),
    with: { productOptions: { with: { values: true } }, productVariants: true },
  });
  return product;
}
