"use server";

import { ORDER_STATUS } from "@/constants/orders";
import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function changeOrderStatusByOrderId({
  orderId,
  status,
}: {
  orderId: string;
  status: (typeof ORDER_STATUS)[number];
}) {
  await db.update(orders).set({ status }).where(eq(orders.id, orderId));
  return { message: "Status updated" };
}
