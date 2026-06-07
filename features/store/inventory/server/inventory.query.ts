"use cache";

import { db } from "@/drizzle/db";
import { products, productVariants } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getAllInventory() {
  cacheTag("inventory");
  return await db.query.productVariants.findMany({
    orderBy: desc(products.createdAt),
    with: {
      product: true,
    },
    where: eq(productVariants.active, true),
  });
}
