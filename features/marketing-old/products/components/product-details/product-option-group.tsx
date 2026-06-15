import { Button } from "@/components/ui/button";
import {
  DetailsProductOptionType,
  DetailsProductSelectedValueType,
  DetailsProductVariantType,
} from "../../types/product.type";
import { isOptionValueAvailable } from "../../helpers/product-details";

type ProductOptionGroupProps = {
  option: DetailsProductOptionType;
  selectedValues: DetailsProductSelectedValueType[];
  onSelect: (value: DetailsProductSelectedValueType) => void;
  variants: DetailsProductVariantType[];
};

export function ProductOptionGroup({
  option,
  selectedValues,
  onSelect,
  variants,
}: ProductOptionGroupProps) {
  return (
    <div className="space-y-4">
      <h3>{option.title}</h3>

      <div className="flex flex-wrap gap-2">
        {option.values.map((value) => {
          const selected = selectedValues.some((v) => v.label === value.label);

          const available = isOptionValueAvailable(
            value.label,
            value.optionId,
            selectedValues,
            variants,
          );

          return (
            <Button
              key={value.id}
              variant={selected ? "default" : "secondary"}
              disabled={!available}
              onClick={() => onSelect(value)}
            >
              {value.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
