"use server";

import { db } from "@/drizzle/db";

export async function getUsers() {
  const res = await db.query.user.findMany();
  return res;
}
