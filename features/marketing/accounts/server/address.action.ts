"use server";

import { addressSchema, AddressSchemaType } from "../schema/address.schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { addresses } from "@/drizzle/schema";

export async function createOrUpdateAddress(values: AddressSchemaType) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = addressSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message,
    };
  }

  const existing = await db.query.addresses.findFirst({
    where: eq(addresses.userId, session.user.id),
  });

  if (existing) {
    await db
      .update(addresses)
      .set(parsed.data)
      .where(eq(addresses.userId, session.user.id));
    return {
      success: true,
      message: "Address Updated",
    };
  } else {
    await db.insert(addresses).values({
      ...parsed.data,
      userId: session.user.id,
    });
    return {
      success: true,
      message: "Address created",
    };
  }
}
