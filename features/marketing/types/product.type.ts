import { getSingleProductById } from "../products/server/products.query";

export type DetailsProductType = Awaited<
  ReturnType<typeof getSingleProductById>
>;
export type DetailsProductOptionType = Awaited<
  ReturnType<typeof getSingleProductById>
>["productOptions"][number];
export type DetailsProductVariantType = Awaited<
  ReturnType<typeof getSingleProductById>
>["productVariants"][number];

export type DetailsProductSelectedValueType = {
  optionId: string;
  label: string;
};
