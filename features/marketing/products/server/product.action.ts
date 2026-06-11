"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getSingleProductById(productId: string) {
  const [product] = await db.query.products.findMany({
    where: eq(products.id, productId),
    with: { productOptions: { with: { values: true } }, productVariants: true },
  });
  return product;
}
