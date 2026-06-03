"use cache";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getAllProducts() {
  cacheTag("products");
  return await db.query.products.findMany({
    orderBy: desc(products.createdAt),
    with: { productVariants: true },
  });
}
