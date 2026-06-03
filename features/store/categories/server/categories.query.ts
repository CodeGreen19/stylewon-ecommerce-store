"use cache";

import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { asc, desc } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getAllCategories() {
  cacheTag("categories");
  return await db.select().from(categories).orderBy(asc(categories.name));
}
