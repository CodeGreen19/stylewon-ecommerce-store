"use client";

import { Separator } from "@/components/ui/separator";
import { useProductVariant } from "../../hooks/use-product-variant";
import {
  DetailsProductSelectedValueType,
  DetailsProductType,
} from "../../types/product.type";
import { ProductOptionGroup } from "./product-option-group";
import { ProductPrice } from "./product-price";
import { ProductPurchaseSection } from "./product-purchase";

export function ProductDetails({ product }: { product: DetailsProductType }) {
  const { selectedValues, selectValue, selectedVariant } =
    useProductVariant(product);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{product.name}</h1>

      <ProductPrice product={product} />

      <Separator />

      {product.productOptions.map((option) => (
        <ProductOptionGroup
          key={option.id}
          option={option}
          variants={product.productVariants}
          selectedValues={selectedValues}
          onSelect={selectValue}
        />
      ))}

      <Separator />

      <ProductPurchaseSection
        variantId={selectedVariant ? selectedVariant.id : ""}
      />
    </div>
  );
}
