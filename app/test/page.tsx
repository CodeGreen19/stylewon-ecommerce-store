"use client";

import { Button } from "@/components/ui/button";
import {
  productSchema,
  ProductType,
} from "@/features/store/products/schemas/product.schema";
import { useTransition } from "react";
import { generateFakeProduct } from "./generate-fake-products";
import { addNewProduct } from "@/features/store/products/server/products.action";

export default function page() {
  const [ispending, startTransition] = useTransition();
  return (
    <div>
      <Button
        disabled={ispending}
        onClick={() => {
          startTransition(async () => {
            const inputs: ProductType[] = Array.from({ length: 3 }).map(() =>
              generateFakeProduct(),
            );
            console.log(inputs);

            for (const product of inputs) {
              const res = await addNewProduct(product);
              console.log(res.message);
            }
          });
        }}
      >
        Seed
      </Button>
    </div>
  );
}
