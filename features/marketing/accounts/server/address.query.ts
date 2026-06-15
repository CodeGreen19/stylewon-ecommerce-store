"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { addresses } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export async function getAddress() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const address = await db.query.addresses.findFirst({
    where: eq(addresses.userId, session.user.id),
  });

  return {
    success: true,
    data: address,
  };
}
