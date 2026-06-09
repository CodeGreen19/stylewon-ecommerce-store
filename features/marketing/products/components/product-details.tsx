"use client";

import { Badge } from "@/components/ui/badge";
import { getSingleProductById } from "../../home/server/home.query";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { addToCart } from "../server/products.server";
import { toast } from "sonner";

export function ProductDetails({
  product,
}: {
  product: Awaited<ReturnType<typeof getSingleProductById>>;
}) {
  const [selectedOptionValue, setSelectedOptionValue] = useState<
    { optionId: string; label: string }[]
  >([]);
  const [selectedVariantId, setSelectedVariantId] = useState("");

  useEffect(() => {
    if (selectedOptionValue.length > 0) {
      const selectedKey = selectedOptionValue
        .map((v) => v.label.toLowerCase())
        .sort()
        .join("|");

      const res = product.productVariants.find((variant) => {
        const variantKey = variant.label
          .split(",")
          .map((v) => v.trim().toLowerCase())
          .sort()
          .join("|");

        return variantKey === selectedKey;
      });
      if (res) {
        setSelectedVariantId(res.id);
      }
    }
  }, [selectedOptionValue]);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <h2 className="space-x-2 text-2xl font-semibold tracking-tight">
        <span>
          &#2547;{product.basePrice * (1 - product.discountInPercent / 100)}
        </span>
        {product.onSale && (
          <>
            <del className="text-destructive">
              <span className="text-muted-foreground ">
                &#2547;{product.basePrice}
              </span>
            </del>
            <Badge className="-translate-y-1.5">
              -{product.discountInPercent}%
            </Badge>
          </>
        )}
      </h2>
      {product.productOptions.length > 0 && <Separator />}
      {product.productOptions.map((opt) => (
        <div key={opt.id} className="space-y-4">
          <h3>{opt.title}</h3>
          <div className="space-x-2">
            {opt.values.map((v) => {
              let variant: "default" | "secondary";
              const isExist = selectedOptionValue.find(
                (o) => o.label === v.label,
              );
              if (isExist) {
                variant = "default";
              } else {
                variant = "secondary";
              }
              return (
                <Button
                  onClick={() => {
                    if (
                      selectedOptionValue.some((o) => o.optionId === v.optionId)
                    ) {
                      setSelectedOptionValue((prev) =>
                        prev.filter((p) => p.optionId !== v.optionId),
                      );
                      setSelectedOptionValue((prev) => [...prev, v]);
                    } else {
                      setSelectedOptionValue((prev) => [...prev, v]);
                    }
                  }}
                  variant={variant}
                  key={v.label}
                >
                  {v.label}
                  {v.color && (
                    <span
                      className="inline-block size-4 rounded-full"
                      style={{ backgroundColor: v.color ?? "" }}
                    ></span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
      <Separator />
      <AddtoCartUI variantId={selectedVariantId} />
    </div>
  );
}

function AddtoCartUI({ variantId }: { variantId: string }) {
  const [isPending, startTransition] = useTransition();
  const [qty, setQty] = useState<number>(1);
  return (
    <div className="flex gap-2">
      <ButtonGroup>
        <Button
          onClick={() => setQty(qty === 1 ? 1 : qty - 1)}
          variant={"secondary"}
        >
          <Minus />
        </Button>
        <Button variant={"secondary"}>{qty}</Button>
        <Button onClick={() => setQty(qty + 1)} variant={"secondary"}>
          <Plus />
        </Button>
      </ButtonGroup>
      <Button
        onClick={() => {
          startTransition(async () => {
            const res = await addToCart({ variantId, qty });
            toast.message(res.message);
          });
        }}
        disabled={!variantId || isPending}
        className={"grow"}
      >
        Add to cart <ShoppingCart />
      </Button>
    </div>
  );
}
