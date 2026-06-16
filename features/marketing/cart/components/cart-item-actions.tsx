"use client";

import { Button } from "@/components/ui/button";
import { deleteCartItem, updateCartItemQuantity } from "../server/cart.action";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  cartItemId: string;
  qty: number;
  stock: number;
};

export function CartItemActions({ cartItemId, qty, stock }: Props) {
  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const refreshCart = () => {
    queryClient.invalidateQueries({
      queryKey: ["cart"],
    });
  };

  const updateQty = (newQty: number) => {
    startTransition(async () => {
      const res = await updateCartItemQuantity({
        cartItemId,
        qty: newQty,
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      refreshCart();
    });
  };

  const removeItem = () => {
    startTransition(async () => {
      const res = await deleteCartItem(cartItemId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      refreshCart();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        disabled={qty <= 1 || isPending}
        onClick={() => updateQty(qty - 1)}
      >
        <Minus />
      </Button>

      <span className="w-8 text-center text-sm font-medium">{qty}</span>

      <Button
        size="icon"
        variant="outline"
        disabled={qty >= stock || isPending}
        onClick={() => updateQty(qty + 1)}
      >
        <Plus />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        disabled={isPending}
        onClick={removeItem}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
