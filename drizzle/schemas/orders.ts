import { PAYMENT_STATUS } from "@/constants/checkout";
import { ORDER_STATUS } from "@/constants/orders";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { relations } from "drizzle-orm";
import { user } from "./user";

export const orderStatusEnum = pgEnum("order_status", ORDER_STATUS);
export const paymentStatusEnum = pgEnum("payment_status", PAYMENT_STATUS);

export const orders = pgTable("orders", {
  id,

  userId: text("user_id").notNull(),
  orderNumber: varchar("order_number", {
    length: 50,
  })
    .notNull()
    .unique(),

  status: orderStatusEnum().default("pending").notNull(),
  paymentStatus: paymentStatusEnum().default("pending").notNull(),
  paymentMethod: varchar({ length: 100 }).notNull(),

  subtotal: integer("subtotal").notNull(),
  shippingFee: integer("shipping_fee").notNull(),
  discount: integer("discount").default(0),
  total: integer("total").notNull(),

  fullName: varchar("full_name", {
    length: 200,
  }).notNull(),

  phoneNumber: varchar("phone_number", {
    length: 50,
  }).notNull(),

  shippingAddress: text("shipping_address").notNull(),
  notes: text("notes"),

  createdAt,
  updatedAt,
});

export const orderItems = pgTable("order_items", {
  id,

  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, {
      onDelete: "cascade",
    }),
  productId: uuid("product_id").notNull(),
  variantId: uuid("variant_id").notNull(),

  productTitle: varchar("product_title", {
    length: 255,
  }).notNull(),

  variantLabel: varchar("variant_label", {
    length: 255,
  }).notNull(),

  sku: varchar("sku", {
    length: 100,
  }),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
  subtotal: integer("subtotal").notNull(),
});

export const ordersRelations = relations(orders, ({ many, one }) => ({
  user: one(user, {
    fields: [orders.userId],
    references: [user.id],
  }),
  orderItems: many(orderItems),
}));
export const orderItemsRelations = relations(orderItems, ({ many, one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));
