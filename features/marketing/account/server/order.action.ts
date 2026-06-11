"use server";

import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getOrders() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("user do not exists");
  }
  const res = await db.query.orders.findMany({
    where: eq(orders.userId, session.user.id),
  });
  return { orders: res };
}
