import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { relations } from "drizzle-orm";
import { user } from "./user";

export const addresses = pgTable("addresses", {
  id,

  userId: text("user_id").notNull(),

  recipientName: varchar("recipient_name", {
    length: 200,
  }).notNull(),

  phone: varchar("phone", {
    length: 50,
  }).notNull(),

  country: varchar("country", {
    length: 100,
  }).notNull(),

  state: varchar("state", {
    length: 100,
  }),

  city: varchar("city", {
    length: 100,
  }).notNull(),

  postalCode: varchar("postal_code", {
    length: 50,
  }),

  addressLine1: text("address_line_1").notNull(),

  addressLine2: text("address_line_2"),

  isDefault: boolean("is_default").default(false),

  createdAt,
  updatedAt,
});

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(user, {
    fields: [addresses.userId],
    references: [user.id],
  }),
}));
