import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { addToCart } from "../../server/cart.action";

import { ShoppingCart } from "lucide-react";
import { showToast } from "@/helpers/func-response";

export function AddToCartButton({
  variantId,
  qty,
}: {
  variantId: string;
  qty: number;
}) {
  const [isPending, startTransition] = useTransition();

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
        });
      }}
    >
      Add to cart
      <ShoppingCart />
    </Button>
  );
}
