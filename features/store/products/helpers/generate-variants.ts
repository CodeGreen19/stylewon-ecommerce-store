import {
  ProductOptionType,
  ProductVariantType,
} from "../schemas/product.schema";

export function generateVariants(
  options: ProductOptionType[],
): ProductVariantType[] {
  if (!options.length) return [];

  const result: { labelParts: string[] }[] = [];

  function backtrack(index: number, path: any[]) {
    if (index === options.length) {
      result.push({ labelParts: [...path] });
      return;
    }

    const option = options[index];

    for (const value of option.values) {
      backtrack(index + 1, [...path, value.label]);
    }
  }

  backtrack(0, []);

  return result.map((combo) => {
    const label = combo.labelParts.join(",");

    return {
      label: label,
      stock: 0,
      priceDiff: 0,
      inventory: 0,
      costOfGoods: 0,
      shippingWeight: 0,
      sku: "",
      active: true,
    };
  });
}
