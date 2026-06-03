// options
import z from "zod";

const productOptionTypeEnum = z.enum(["text", "color"]);
export const productOptionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  type: productOptionTypeEnum,
  values: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(100),
        color: z
          .string()
          .regex(/^#([0-9A-F]{3}){1,2}$/i)
          .optional(),
      }),
    )
    .min(1),
});

export type ProductOptionType = z.infer<typeof productOptionSchema>;

// variant
export const productVariantSchema = z.object({
  label: z.string().min(1),
  priceDiff: z.number(),
  costOfGoods: z.number().min(0),
  stock: z.number().int().min(0),
  shippingWeight: z.number().min(0),
  sku: z.string(),
  active: z.boolean(),
});

export type ProductVariantType = z.infer<typeof productVariantSchema>;

// product
export const productSchema = z.object({
  name: z.string().min(10).max(100),
  description: z.string(),
  images: z.array(z.string()),

  basePrice: z.number().min(10).max(100000),
  onSale: z.boolean(),
  discountInPercent: z.number().max(99).nonnegative(),
  trackInventory: z.boolean(),

  manageOnOptions: z.boolean(),
  productVariants: z.array(productVariantSchema),
  productOptions: z.array(productOptionSchema),
});

export type ProductType = z.infer<typeof productSchema>;

// default variant
export const defaultProductVariant: ProductVariantType = {
  label: "default",
  priceDiff: 0,
  costOfGoods: 0,
  shippingWeight: 0,
  sku: "",
  stock: 0,
  active: true,
};

// default product
export const productDefaultValues: ProductType = {
  name: "",
  description: "",
  images: [],

  basePrice: 0,
  onSale: false,
  discountInPercent: 0,
  trackInventory: false,

  manageOnOptions: false,
  productVariants: [defaultProductVariant],
  productOptions: [],
};
