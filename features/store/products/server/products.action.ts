"use server";
import { db } from "@/drizzle/db";
import { productSchema, ProductType } from "../schemas/product.schema";
import {
  productOptions,
  productOptionValues,
  products,
  productVariants,
} from "@/drizzle/schema";
import { updateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { errorResponse, successResponse } from "@/helpers/func-response";

export async function addNewProduct(inputs: ProductType) {
  const { data, success } = productSchema.safeParse(inputs);
  if (!success) {
    return errorResponse("Invalid inputs");
  }
  // add product
  const [product] = await db.insert(products).values(data).returning();

  // add options
  for (const opt of data.productOptions) {
    const [resOpt] = await db
      .insert(productOptions)
      .values({
        ...opt,
        productId: product.id,
      })
      .returning();

    await db.insert(productOptionValues).values(
      opt.values.map((v) => ({
        ...v,
        optionId: resOpt.id,
      })),
    );
  }
  // add variant
  await db
    .insert(productVariants)
    .values(data.productVariants.map((v) => ({ ...v, productId: product.id })));

  // update cache
  updateTag("products");
  updateTag("inventory");
  return successResponse("New product added");
}

export async function updateProduct(
  inputs: ProductType & { productId: string },
) {
  const { data, success } = productSchema.safeParse(inputs);
  if (!success) {
    return errorResponse("Invalid inputs");
  }

  await db.update(products).set(data).where(eq(products.id, inputs.productId));

  // delelete and then re-create options
  await db
    .delete(productOptions)
    .where(eq(productOptions.productId, inputs.productId));
  for (const opt of data.productOptions) {
    const [resOpt] = await db
      .insert(productOptions)
      .values({
        ...opt,
        productId: inputs.productId,
      })
      .returning();

    await db.insert(productOptionValues).values(
      opt.values.map((v) => ({
        ...v,
        optionId: resOpt.id,
      })),
    );
  }

  // delete variants and re-create variants
  await db
    .delete(productVariants)
    .where(eq(productVariants.productId, inputs.productId));
  await db
    .insert(productVariants)
    .values(
      data.productVariants.map((v) => ({ ...v, productId: inputs.productId })),
    );

  // update cache
  updateTag("products");
  updateTag("inventory");
  return successResponse("Updated");
}

export async function deleteSingleProduct(productId: string) {
  await db.delete(products).where(eq(products.id, productId));

  updateTag("products");
  updateTag("inventory");
  return successResponse("Deleted");
}

export async function getSingleProduct(productId: string) {
  return await db.query.products.findMany({
    where: eq(products.id, productId),
    with: { productVariants: true, productOptions: { with: { values: true } } },
  });
}
