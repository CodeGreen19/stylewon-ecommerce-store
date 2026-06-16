import z from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(200),

  phone: z.string().trim().min(11, "Phone number is required").max(50),

  district: z.string().trim().min(1, "District is required").max(100),

  thana: z.string().trim().min(1, "Thana is required").max(100),

  postalCode: z.string().trim().max(50).optional(),

  receivingLocation: z
    .string()
    .trim()
    .min(5, "Receiving location is required")
    .max(1000),
  shippingFees: z.number().nonnegative(),
  paymentMethod: z
    .string()
    .trim()
    .min(2, "payment method is required")
    .max(200),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;

export const checkoutDefaultValues: CheckoutSchemaType = {
  fullName: "",
  phone: "",
  receivingLocation: "",
  shippingFees: 0,
  paymentMethod: "Cash on delivery",
  thana: "",
  district: "",
  postalCode: "",
};
