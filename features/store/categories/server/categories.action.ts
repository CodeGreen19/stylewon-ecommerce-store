"use server";

import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import {
  categorySchema,
  CategorySchemaType,
} from "../schemas/categories.schema";

export async function addCategory(category: CategorySchemaType) {
  const { success, data } = categorySchema.safeParse(category);

  if (!success) {
    throw new Error("Invalid category!");
  }

  await db.insert(categories).values({
    ...data,
  });

  updateTag("categories");
  return { message: "New category created" };
}
export async function updateCategory(
  category: CategorySchemaType & { categoryId: string },
) {
  const { success, data } = categorySchema.safeParse(category);

  if (!success) {
    throw new Error("Invalid category!");
  }

  await db
    .update(categories)
    .set({
      ...data,
    })
    .where(eq(categories.id, category.categoryId));

  updateTag("categories");
  return { message: " Category updated" };
}

export async function deleteCategory(categoryId: string) {
  await db.delete(categories).where(eq(categories.id, categoryId));

  updateTag("categories");
  return { message: "Category deleted" };
}
