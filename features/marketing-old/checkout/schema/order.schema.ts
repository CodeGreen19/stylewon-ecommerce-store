import { SHIPPING_METHOD } from "@/constants/checkout";
import z from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(2).max(200),

  customerPhone: z.string().min(6).max(30),

  shippingAddress: z.string().min(10).max(1000),

  notes: z.string().max(1000).optional(),
  shippingFee: z.number().min(0),
  paymentType: z.enum(SHIPPING_METHOD),
  subtotal: z.number().min(0),
});

export type OrderSchemaType = z.infer<typeof orderSchema>;
export const orderDefaultValue: OrderSchemaType = {
  customerName: "",
  customerPhone: "",
  shippingAddress: "",
  notes: "",
  paymentType: "Cash on delivery",
  shippingFee: 100,
  subtotal: 0,
};
