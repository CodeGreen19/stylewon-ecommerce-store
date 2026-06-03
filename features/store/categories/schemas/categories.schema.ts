// zod schema
import z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "must be 3 char at least")
    .max(50, "must not exceed 100 char"),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
