// drizzle schema
import { pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { products } from "./products";
import { relations } from "drizzle-orm";

export const categories = pgTable("categories", {
  id,
  name: varchar("name", { length: 50 }).notNull(),

  createdAt,
  updatedAt,
});

export const productsToCategories = pgTable(
  "products_to_categories",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.productId, t.categoryId] })],
);
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(productsToCategories),
}));
// Declaring Relational Hooks for Queries
export const productsToCategoriesRelations = relations(
  productsToCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productsToCategories.productId], // Old: 'fields' instead of 'from'
      references: [products.id], // Old: 'references' instead of 'to'
    }),
    category: one(categories, {
      fields: [productsToCategories.categoryId],
      references: [categories.id],
    }),
  }),
);
