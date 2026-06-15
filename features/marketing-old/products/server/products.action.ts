import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";

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
