"use server";

import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { asc, eq } from "drizzle-orm";

export async function getOrders() {
  return await db.query.orders.findMany();
}

export async function getOrderDetailsByOrderId(orderId: string) {
  const orderInfo = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: { orderItems: true },
    orderBy: asc(orders.createdAt),
  });
  if (!orderInfo) {
    throw new Error("Order items not found");
  }
  return orderInfo;
}
