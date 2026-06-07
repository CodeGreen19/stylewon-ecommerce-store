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

export const type = ["text", "color"] as const;
export const typeEnum = pgEnum("type", type);

export const productOptions = pgTable("product_options", {
  id,
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  name: varchar("name", {
    length: 100,
  }).notNull(),
  type: typeEnum().notNull(),
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

// export const productOptionTypeEnum = pgEnum("product_option_type", [
//   "text",
//   "color",
// ]);

// export const inventoryStatusEnum = pgEnum("inventory_status", [
//   "in_stock",
//   "out_of_stock",
//   "backorder",
// ]);

// export const productVariants = pgTable("product_variants", {
//   id,
//   productId: uuid("product_id")
//     .notNull()
//     .references(() => products.id, {
//       onDelete: "cascade",
//     }),

//   title: varchar("title", {
//     length: 200,
//   }).notNull(),

//   sku: varchar("sku", {
//     length: 100,
//   })
//     .notNull()
//     .unique(),

//   barcode: varchar("barcode", {
//     length: 100,
//   }),

//   price: integer("price"),
//   costOfGood: integer("cost_of_good"),
//   shippingWeight: integer("shipping_weight"),

//   inventoryQuantity: integer("inventory_quantity").notNull().default(0),

//   inventoryStatus: inventoryStatusEnum("inventory_status")
//     .notNull()
//     .default("in_stock"),

//   trackInventory: boolean("track_inventory"),
//   createdAt,
//   updatedAt,
// });

// export const productsRelations = relations(products, ({ many }) => ({
//   options: many(productOptions),
// }));

// export const productOptionsRelations = relations(
//   productOptions,
//   ({ one, many }) => ({
//     product: one(products, {
//       fields: [productOptions.productId],
//       references: [products.id],
//     }),

//     values: many(productOptionValues),
//   }),
// );
