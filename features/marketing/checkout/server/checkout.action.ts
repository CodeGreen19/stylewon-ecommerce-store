"use server";

import { db } from "@/drizzle/db";
import { getCart } from "../../cart/server/cart.query";
import { eq } from "drizzle-orm";
import { addresses, carts, orderItems, orders } from "@/drizzle/schema";
import { checkoutSchema, CheckoutSchemaType } from "../schema/checkout.schema";

export async function confirmCheckout(inputs: CheckoutSchemaType) {
  const { success, data } = checkoutSchema.safeParse(inputs);

  if (!success) {
    return { message: "invalid inputs" };
  }
  const cart = await getCart();

  // update address
  const addressExists = await db.query.addresses.findFirst({
    where: eq(addresses.userId, cart.userId),
  });
  if (addressExists) {
    await db
      .update(addresses)
      .set({ ...data })
      .where(eq(addresses.userId, cart.userId));
  } else {
    await db.insert(addresses).values({ userId: cart.userId, ...data });
  }

  // create order
  const totalMRP = cart.cartItems.reduce(
    (prev, item) =>
      item.qty * (item.variant.product.basePrice + item.variant.priceDiff) +
      prev,
    0,
  );

  const [newOrder] = await db
    .insert(orders)
    .values({
      userId: cart.userId,
      fullName: data.fullName,
      orderNumber: crypto.randomUUID().slice(0, 8),
      phoneNumber: data.phone,
      paymentMethod: data.paymentMethod,
      shippingAddress: `${data.district},${data.thana},${data.receivingLocation}`,
      shippingFee: data.shippingFees,
      subtotal: totalMRP,
      total: totalMRP + data.shippingFees,
    })
    .returning();

  const orderItemsValues: (typeof orderItems.$inferInsert)[] =
    cart.cartItems.map((item) => ({
      orderId: newOrder.id,
      productId: item.variant.product.id,
      productTitle: item.variant.product.name,
      quantity: item.qty,
      subtotal:
        item.qty * (item.variant.priceDiff + item.variant.product.basePrice),
      unitPrice: item.variant.priceDiff + item.variant.product.basePrice,
      variantId: item.variantId,
      variantLabel: item.variant.label,
      sku: item.variant.sku,
    }));

  await db.insert(orderItems).values(orderItemsValues);
  // deleting carts

  await db.delete(carts).where(eq(carts.userId, cart.userId));

  return { message: "Order Confirmed" };
}
