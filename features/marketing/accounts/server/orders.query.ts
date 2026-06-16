"use server";

import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { asc, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getUserOrders() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }
  return await db.query.orders.findMany({
    where: eq(orders.userId, session.user.id),
    orderBy: asc(orders.createdAt),
    with: { orderItems: true },
  });
}

// const ordersInfo: {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
//   fullName: string;
//   paymentMethod: string;
//   userId: string;
//   status:
//     | "pending"
//     | "confirmed"
//     | "processing"
//     | "shipped"
//     | "delivered"
//     | "cancelled"
//     | "refunded";
//   paymentStatus: "pending" | "refunded" | "paid" | "failed";
//   subtotal: number;
//   shippingFee: number;
//   discount: number | null;
//   total: number;
//   phoneNumber: string;
//   shippingAddress: string;
//   notes: string | null;
//   orderItems: {
//     id: string;
//     subtotal: number;
//     productId: string;
//     sku: string | null;
//     variantId: string;
//     orderId: string;
//     productTitle: string;
//     variantLabel: string;
//     unitPrice: number;
//     quantity: number;
//   }[];
// }[];
