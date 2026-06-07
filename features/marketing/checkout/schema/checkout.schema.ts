import z from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().min(2).max(200),

  customerPhone: z.string().min(6).max(30),

  shippingAddress: z.string().min(10).max(1000),

  notes: z.string().max(1000).optional(),
});

export type CheckoutType = z.infer<typeof checkoutSchema>;
