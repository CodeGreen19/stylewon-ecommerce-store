"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function fetchProducts({ pageParam = 0 }) {
  const LIMIT = 20;

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

export async function getSingleProductById(productId: string) {
  const [product] = await db.query.products.findMany({
    where: eq(products.id, productId),
    with: { productOptions: { with: { values: true } }, productVariants: true },
  });
  return product;
}
