"use client";

import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { generateFakeProducts } from "./generate-fake-products";
import { addNewProduct } from "@/features/store/products/server/products.action";
import { toast } from "sonner";
import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";

export default function page() {
  const [ispending, startTransition] = useTransition();
  return (
    <div>
      <Button
        disabled={ispending}
        onClick={() => {
          startTransition(async () => {
            const res = generateFakeProducts(100).map((item) =>
              addNewProduct(item),
            );
            await Promise.all(res);
            toast("worked");
          });
        }}
      >
        Seed
      </Button>
    </div>
  );
}
