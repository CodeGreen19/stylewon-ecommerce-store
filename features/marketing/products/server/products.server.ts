"use server";

import { db } from "@/drizzle/db";
import { cartItems, carts, products, productVariants } from "@/drizzle/schema";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { and, eq } from "drizzle-orm";

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
    return {
      message: "Signin is required",
    };
  }

  const [variant] = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.id, variantId));

  if (!variant) {
    return {
      message: "Variant not found",
    };
  }

  if (variant.stock <= 0) {
    return {
      message: "Out of stock",
    };
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
      return {
        message: `Only ${variant.stock} items available`,
      };
    }

    await db
      .update(cartItems)
      .set({
        qty: newQty,
      })
      .where(eq(cartItems.id, existingItem.id));

    return {
      message: "Cart updated",
    };
  }

  // -------------------------
  // New Item
  // -------------------------
  if (qty > variant.stock) {
    return {
      success: false,
      message: `Only ${variant.stock} items available`,
    };
  }

  await db.insert(cartItems).values({
    cartId: cart.id,
    variantId,
    qty,
  });

  return {
    message: "Added to cart",
  };
}
