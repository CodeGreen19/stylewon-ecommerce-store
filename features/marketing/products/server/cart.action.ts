"use server";

import { db } from "@/drizzle/db";
import { cartItems, carts, productVariants } from "@/drizzle/schema";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { and, eq } from "drizzle-orm";
import { errorResponse, successResponse } from "@/helpers/func-response";

export async function addToCart({
  qty,
  variantId,
}: {
  qty: number;
  variantId: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return errorResponse("Signin is required");
  }

  const [variant] = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.id, variantId));

  if (!variant) {
    return errorResponse("Variant not found");
  }

  if (variant.stock <= 0) {
    return errorResponse("Out of stock");
  }

  let [cart] = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, session.user.id));

  if (!cart) {
    const [newCart] = await db
      .insert(carts)
      .values({
        userId: session.user.id,
      })
      .returning();

    cart = newCart;
  }

  // -------------------------
  // Existing Item?
  // -------------------------
  const [existingItem] = await db
    .select()
    .from(cartItems)
    .where(
      and(eq(cartItems.cartId, cart.id), eq(cartItems.variantId, variantId)),
    );

  if (existingItem) {
    const newQty = existingItem.qty + qty;

    if (newQty > variant.stock) {
      return errorResponse(`Only ${variant.stock} items available`);
    }

    await db
      .update(cartItems)
      .set({
        qty: newQty,
      })
      .where(eq(cartItems.id, existingItem.id));

    return successResponse("Cart updated");
  }

  // -------------------------
  // New Item
  // -------------------------
  if (qty > variant.stock) {
    return errorResponse(`Only ${variant.stock} items available`);
  }

  await db.insert(cartItems).values({
    cartId: cart.id,
    variantId,
    qty,
  });

  return successResponse("Added to cart");
}
