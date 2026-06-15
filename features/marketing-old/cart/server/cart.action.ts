"use server";

import { db } from "@/drizzle/db";
import { carts, cartItems, productVariants } from "@/drizzle/schema";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { and, eq } from "drizzle-orm";

export async function updateCartItemQuantity({
  cartItemId,
  qty,
}: {
  cartItemId: string;
  qty: number;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Signin required",
    };
  }

  const [cart] = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, session.user.id));

  if (!cart) {
    return {
      success: false,
      message: "Cart not found",
    };
  }

  const [item] = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.id, cartItemId), eq(cartItems.cartId, cart.id)));

  if (!item) {
    return {
      success: false,
      message: "Cart item not found",
    };
  }

  const variant = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, item.variantId),
  });

  if (!variant) {
    return {
      success: false,
      message: "Variant no longer exists",
    };
  }

  if (qty > variant.stock) {
    return {
      success: false,
      message: `Only ${variant.stock} available`,
    };
  }
  await db.update(cartItems).set({ qty }).where(eq(cartItems.id, cartItemId));

  return {
    success: true,
    message: "Quantity updated",
  };
}

export async function deleteCartItem(cartItemId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Signin required",
    };
  }

  const [cart] = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, session.user.id));

  if (!cart) {
    return {
      success: false,
      message: "Cart not found",
    };
  }

  const [item] = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.id, cartItemId), eq(cartItems.cartId, cart.id)));

  if (!item) {
    return {
      success: false,
      message: "Cart item not found",
    };
  }

  await db.delete(cartItems).where(eq(cartItems.id, cartItemId));

  return {
    success: true,
    message: "Item removed",
  };
}

export async function getCart() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("user not exist");
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.userId, session.user.id),
    with: { cartItems: { with: { variant: { with: { product: true } } } } },
  });

  return { cart };
}
export async function getCartCount() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("user not exist");
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.userId, session.user.id),
    with: { cartItems: true },
  });

  return { count: cart?.cartItems.length || 0 };
}
