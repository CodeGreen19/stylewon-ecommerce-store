import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { relations } from "drizzle-orm";
import { productsToCategories } from "./categories";
import { cartItems } from "./carts";
import { productOptionValueTypes } from "@/constants/products";

export const products = pgTable("products", {
  id,
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  images: text("images").array().notNull(),

  basePrice: integer("base_price").notNull(),
  onSale: boolean("on_sale").notNull().default(false),
  trackInventory: boolean("track_inventory").notNull().default(false),
  discountInPercent: integer("discount_in_percent").notNull().default(0),

  manageOnOptions: boolean("manage_on_options").notNull().default(false),

  createdAt,
  updatedAt,
});

export const productVariants = pgTable("product_variants", {
  id,

  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),

  label: varchar("label", {
    length: 100,
  }).notNull(),
  priceDiff: integer("price_diff").notNull(),
  costOfGoods: integer("cost_of_goods").notNull(),
  stock: integer("stock").notNull(),
  shippingWeight: integer("shipping_weight").notNull(),
  sku: text("sku"),
  active: boolean("active").notNull().default(true),

  createdAt,
  updatedAt,
});

export const typeEnum = pgEnum("value_type", productOptionValueTypes);

export const productOptions = pgTable("product_options", {
  id,
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  title: varchar("title", {
    length: 100,
  }).notNull(),
  valueType: typeEnum().notNull(),
  createdAt,
  updatedAt,
});

export const productOptionValues = pgTable("product_option_values", {
  id,
  optionId: uuid("option_id")
    .notNull()
    .references(() => productOptions.id, {
      onDelete: "cascade",
    }),
  label: varchar("label", {
    length: 100,
  }).notNull(),
  color: varchar("color", {
    length: 20,
  }),
  createdAt,
});

export const productsRelations = relations(products, ({ many }) => ({
  productVariants: many(productVariants),
  productOptions: many(productOptions),
  categories: many(productsToCategories),
}));
export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    cartItems: many(cartItems),
  }),
);

export const productOptionsRelations = relations(
  productOptions,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productOptions.productId],
      references: [products.id],
    }),

    values: many(productOptionValues),
  }),
);

export const productOptionValuesRelations = relations(
  productOptionValues,
  ({ one }) => ({
    option: one(productOptions, {
      fields: [productOptionValues.optionId],
      references: [productOptions.id],
    }),
  }),
);
