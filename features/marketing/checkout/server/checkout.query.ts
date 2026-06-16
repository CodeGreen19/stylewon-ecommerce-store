"use server";

import { db } from "@/drizzle/db";
import { getCart } from "../../cart/server/cart.query";
import { eq } from "drizzle-orm";
import { addresses } from "@/drizzle/schema";

const SHIPPING_FEES = 0;
export async function getCheckoutInfo() {
  const cart = await getCart();

  const customerAddress = await db.query.addresses.findFirst({
    where: eq(addresses.userId, cart.userId),
  });
  const totalMRP = cart.cartItems.reduce(
    (prev, item) =>
      item.qty * (item.variant.product.basePrice + item.variant.priceDiff) +
      prev,
    0,
  );
  return {
    address: customerAddress,
    totalMRP,
    totalAmount: totalMRP + SHIPPING_FEES,
  };
}
