import { useMemo, useState } from "react";
import {
  DetailsProductSelectedValueType,
  DetailsProductType,
} from "../../types/product.type";

export function useProductVariant(product: DetailsProductType) {
  const [selectedValues, setSelectedValues] = useState<
    DetailsProductSelectedValueType[]
  >([]);

  const selectedVariant = useMemo(() => {
    const selectedKey = selectedValues
      .map((v) => v.label.toLowerCase())
      .sort()
      .join("|");

    return product.productVariants.find((variant) => {
      const variantKey = variant.label
        .split(",")
        .map((v) => v.trim().toLowerCase())
        .sort()
        .join("|");

      return variantKey === selectedKey;
    });
  }, [selectedValues, product.productVariants]);

  function selectValue(newValue: DetailsProductSelectedValueType) {
    setSelectedValues((prev) => {
      const next = [
        ...prev.filter((v) => v.optionId !== newValue.optionId),
        newValue,
      ];

      return next.filter((candidate) => {
        const otherSelections = next.filter(
          (v) => v.optionId !== candidate.optionId,
        );

        return product.productVariants.some((variant) => {
          if (!variant.active) return false;

          const labels = variant.label.split(",").map((v) => v.trim());

          return (
            labels.includes(candidate.label) &&
            otherSelections.every((s) => labels.includes(s.label))
          );
        });
      });
    });
  }

  return {
    selectedValues,
    selectedVariant,
    selectValue,
  };
}
