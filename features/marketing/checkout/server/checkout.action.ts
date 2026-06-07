"use server";

import { auth } from "@/lib/auth";
import { getCart } from "../../cart/server/cart.action";
import { checkoutSchema, CheckoutType } from "../schema/checkout.schema";
import { headers } from "next/headers";
import { db } from "@/drizzle/db";
import { orderItems, orders } from "@/drizzle/schemas/orders";
import { addresses, carts, productVariants } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { user } from "@/auth-schema";

export async function getCheckout() {
  const { cart } = await getCart();

  if (!cart) {
    return {
      success: false,
      message: "Cart is empty",
    };
  }

  const subtotal = cart.cartItems.reduce(
    (prev, curr) =>
      (curr.variant.priceDiff + curr.variant.product.basePrice) * curr.qty +
      prev,
    0,
  );
  const shippingFee = 100;

  const total = subtotal + shippingFee;

  const address = await db.query.addresses.findFirst({
    where: eq(addresses.userId, cart.userId),
  });

  return {
    cart,
    subtotal,
    shippingFee,
    total,
    address,
  };
}

export async function createOrder(input: CheckoutType) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Signin required",
    };
  }

  const { data, success } = checkoutSchema.safeParse(input);

  if (!success) {
    return {
      success: false,
      message: "Invalid checkout data",
    };
  }
  console.log("data-parsed");

  const checkOutData = await getCheckout();

  if (!checkOutData) {
    return {
      success: false,
      message: "Cart is empty",
    };
  }

  if (checkOutData.address) {
    await db
      .update(addresses)
      .set({
        addressLine1: data.shippingAddress,
        recipientName: data.customerName,
        phone: data.customerPhone,
      })
      .where(eq(addresses.userId, session.user.id));
    console.log("address updated");
  } else {
    await db.insert(addresses).values({
      addressLine1: data.shippingAddress,
      recipientName: data.customerName,
      phone: data.customerPhone,
      city: "dummy-city",
      country: "dummy-country",
      userId: session.user.id,
    });
    console.log("address-created");
  }
  const { subtotal, shippingFee, total } = checkOutData;

  const orderNumber = crypto.randomUUID().slice(0, 8).toUpperCase();

  const orderInserValue: typeof orders.$inferInsert = {
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    orderNumber,
    shippingAddress: data.shippingAddress,
    shippingFee: shippingFee || 0,
    subtotal: subtotal || 0,
    total: total || 0,
    userId: session.user.id,
  };

  const [order] = await db.insert(orders).values(orderInserValue).returning();

  console.log("order-created");
  if (checkOutData.cart?.cartItems) {
    for (const element of checkOutData.cart.cartItems) {
      await db.insert(orderItems).values({
        orderId: order.id,
        productId: element.variant.product.id,
        productTitle: element.variant.product.name,
        quantity: element.qty,
        subtotal:
          (element.variant.product.basePrice + element.variant.priceDiff) *
          element.qty,
        unitPrice: element.variant.product.basePrice,
        variantId: element.variantId,
        variantLabel: element.variant.label,
      });
      console.log("order-item-created");

      if (element.variant.product.trackInventory) {
        const [res] = await db
          .select()
          .from(productVariants)
          .where(eq(productVariants.id, element.variant.id));
        await db
          .update(productVariants)
          .set({ stock: res.stock - element.qty });
        console.log("stock updated");
      }
    }
  }

  await db.delete(carts).where(eq(carts.userId, session.user.id));
  console.log("cart-deleted");
  return {
    success: true,
    orderId: order.id,
  };
}
