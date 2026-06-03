// drizzle schema
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";

export const categories = pgTable("categories", {
  id,
  name: varchar("name", { length: 50 }).notNull(),

  createdAt,
  updatedAt,
});
