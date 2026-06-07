"use cache";
import { db } from "@/drizzle/db";
import { categories, productsToCategories } from "@/drizzle/schema"; // Import junction table
import { asc, sql } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getAllCategories() {
  cacheTag("categories");

  return await db
    .select({
      id: categories.id,
      name: categories.name,
      // Add other category fields here if needed
      productCount:
        sql<number>`count(${productsToCategories.productId})`.mapWith(Number),
    })
    .from(categories)
    .leftJoin(
      productsToCategories,
      sql`${categories.id} = ${productsToCategories.categoryId}`,
    )
    .groupBy(categories.id)
    .orderBy(asc(categories.name));
}
