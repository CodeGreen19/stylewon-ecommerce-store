import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { user } from "./user";

export const addresses = pgTable("addresses", {
  id,

  userId: text("user_id").notNull(),

  fullName: varchar("fullName", {
    length: 200,
  }).notNull(),

  phone: varchar("phone", {
    length: 50,
  }).notNull(),

  district: varchar("district", {
    length: 100,
  }),

  thana: varchar("thana", {
    length: 100,
  }).notNull(),

  postalCode: varchar("postal_code", {
    length: 50,
  }),

  receivingLocation: text("receiving_location").notNull(),

  createdAt,
  updatedAt,
});

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(user, {
    fields: [addresses.userId],
    references: [user.id],
  }),
}));
