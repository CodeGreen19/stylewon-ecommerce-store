"use server";

import { db } from "@/drizzle/db";

export async function getOrders() {
  return await db.query.orders.findMany();
}
