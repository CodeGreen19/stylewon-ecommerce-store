import {
  DetailsProductSelectedValueType,
  DetailsProductVariantType,
} from "../types/product.type";

export function isOptionValueAvailable(
  valueLabel: string,
  optionId: string,
  selectedValues: DetailsProductSelectedValueType[],
  variants: DetailsProductVariantType[],
) {
  const filters = selectedValues.filter((v) => v.optionId !== optionId);

  return variants.some((variant) => {
    if (!variant.active) return false;

    const labels = variant.label.split(",").map((v) => v.trim());

    const containsCurrentValue = labels.includes(valueLabel);

    const containsSelectedValues = filters.every((selected) =>
      labels.includes(selected.label),
    );

    return containsCurrentValue && containsSelectedValues;
  });
}
