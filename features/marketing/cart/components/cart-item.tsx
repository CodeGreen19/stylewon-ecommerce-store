import Image from "next/image";
import { CartItemActions } from "./cart-item-actions";
import { getCart } from "../server/cart.query";

type CartItemProps = {
  item: Awaited<ReturnType<typeof getCart>>["cartItems"][number];
};

export function CartItem({ item }: CartItemProps) {
  const product = item.variant.product;

  const price = product.basePrice + item.variant.priceDiff;

  const subtotal = price * item.qty;

  return (
    <div className="flex gap-3 border-b py-4">
      <div className="relative size-20 overflow-hidden rounded-md border">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-2 text-sm font-medium">{product.name}</h4>

        <p className="mt-1 text-xs text-muted-foreground">
          {item.variant.label}
        </p>

        <p className="mt-2 text-sm font-semibold">৳{price}</p>

        <div className="mt-3 flex items-center justify-between">
          <CartItemActions
            cartItemId={item.id}
            qty={item.qty}
            stock={item.variant.stock}
          />

          <div className="text-sm font-semibold">৳{subtotal}</div>
        </div>
      </div>
    </div>
  );
}
