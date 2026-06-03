import { ProductVariantType } from "../schemas/product.schema";

export function useVariantSummary(
  variants: ProductVariantType[],
  basePrice: number,
  trackInventory: boolean,
) {
  const totalVariants = variants.length;

  const totalPrice = variants.reduce(
    (acc, variant) => acc + variant.priceDiff + basePrice,
    0,
  );

  const totalInventoryStock = variants.reduce(
    (acc, variant) => acc + variant.stock,
    0,
  );

  const totalShippingWeight = variants.reduce(
    (acc, variant) => acc + variant.shippingWeight,
    0,
  );

  return {
    totalVariants,
    averagePrice: totalVariants > 0 ? totalPrice / totalVariants : 0,

    totalInventoryStock: trackInventory ? totalInventoryStock : "Untracked",

    averageShippingWeight:
      totalVariants > 0 ? totalShippingWeight / totalVariants : 0,
  };
}
