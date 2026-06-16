"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { addresses, carts } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export async function getCart() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.userId, session.user.id),
    with: { cartItems: { with: { variant: { with: { product: true } } } } },
  });
  if (!cart) {
    return { cartItems: [], cartItemsCount: 0, userId: session.user.id };
  }

  return {
    cartItems: cart.cartItems,
    cartItemsCount: cart.cartItems.length,
    userId: session.user.id,
  };
}
