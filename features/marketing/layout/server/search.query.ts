"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { ilike } from "drizzle-orm";

export async function getProductsByQuery(query: string) {
  return await db.query.products.findMany({
    where: ilike(products.name, `%${query}%`),
    limit: 5,
  });
}
