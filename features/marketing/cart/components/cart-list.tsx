import { getCart } from "../server/cart.query";
import { CartItem } from "./cart-item";

type Props = {
  cartItems: Awaited<ReturnType<typeof getCart>>["cartItems"];
};

export function CartList({ cartItems }: Props) {
  if (!cartItems.length) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
