"use server";

import { db } from "@/drizzle/db";
import { categories, products, productsToCategories } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export async function addProductToCategory(
  productIds: string[],
  categoryId: string,
) {
  if (productIds.length === 0 || !categoryId) {
    return {
      message: "Missing product or category identifier.",
    };
  }

  const data: (typeof productsToCategories.$inferInsert)[] = productIds.map(
    (v) => ({ productId: v, categoryId }),
  );
  await db.insert(productsToCategories).values(data).onConflictDoNothing();
  updateTag("categories");
  return { message: "Product linked successfully!" };
}

export async function removeProductFromCategory(
  productId: string,
  categoryId: string,
) {
  if (!productId || !categoryId) {
    return { message: "Missing parameters." };
  }

  await db
    .delete(productsToCategories)
    .where(
      and(
        eq(productsToCategories.productId, productId),
        eq(productsToCategories.categoryId, categoryId),
      ),
    );
  updateTag("categories");
  return { message: "Product removed from category." };
}

export async function getProductsByCategory(categoryId: string) {
  const data = await db.query.categories.findFirst({
    where: eq(categories.id, categoryId),
    with: {
      products: {
        with: {
          product: true, // Pull core product row fields
        },
      },
    },
  });

  return data;
}

export async function fetchProducts({ pageParam = 0 }) {
  const LIMIT = 10;

  const [productsData, totalResult] = await Promise.all([
    db.select().from(products).limit(LIMIT).offset(pageParam),
    db.select({ count: products.id }).from(products),
  ]);

  const total = totalResult.length;

  // 2. Determine if a next page exists
  const hasMore = pageParam + LIMIT < total;

  return {
    products: productsData,
    nextCursor: hasMore ? pageParam + LIMIT : null,
  };
}
