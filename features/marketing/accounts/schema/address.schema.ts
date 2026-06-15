import z from "zod";

export const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(200),

  phone: z.string().trim().min(11, "Phone number is required").max(50),

  district: z.string().trim().max(100).optional(),

  thana: z.string().trim().min(1, "Thana is required").max(100),

  postalCode: z.string().trim().max(50).optional(),

  receivingLocation: z
    .string()
    .trim()
    .min(5, "Receiving location is required")
    .max(1000),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;
