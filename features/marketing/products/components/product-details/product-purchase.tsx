"use client";

import { useState } from "react";
import { QuantitySelector } from "./qty-selector";
import { AddToCartButton } from "./add-to-cart";

type ProductPurchaseSectionProps = {
  variantId: string;
};

export function ProductPurchaseSection({
  variantId,
}: ProductPurchaseSectionProps) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex gap-2">
      <QuantitySelector value={qty} onChange={setQty} />

      <AddToCartButton variantId={variantId} qty={qty} />
    </div>
  );
}
