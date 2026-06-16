import { Button } from "@/components/ui/button";
import { useTransition } from "react";

import { ShoppingCart } from "lucide-react";
import { showToast } from "@/helpers/func-response";
import { addToCart } from "../../server/cart.action";
import { useQueryClient } from "@tanstack/react-query";

export function AddToCartButton({
  variantId,
  qty,
}: {
  variantId: string;
  qty: number;
}) {
  const [isPending, startTransition] = useTransition();
  const qc = useQueryClient();

  return (
    <Button
      disabled={!variantId || isPending}
      className="grow"
      onClick={() => {
        startTransition(async () => {
          const res = await addToCart({
            variantId,
            qty,
          });

          showToast(res);
          if (res.success) {
            qc.invalidateQueries({ queryKey: ["cart"] });
          }
        });
      }}
    >
      Add to cart
      <ShoppingCart />
    </Button>
  );
}
