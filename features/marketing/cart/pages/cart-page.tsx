"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  deleteCartItem,
  getCart,
  updateCartItemQuantity,
} from "../server/cart.action";

export function CartPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  if (isPending) {
    return <div>Pending...</div>;
  }
  if (error) {
    return <div>Error occurs</div>;
  }

  if (!data.cart) {
    return <EmptyCart />;
  }
  const cart = data.cart;

  const total = cart.cartItems.reduce(
    (prev, curr) =>
      (curr.variant.priceDiff + curr.variant.product.basePrice) * curr.qty +
      prev,
    0,
  );
  return (
    <div className=" max-w-7xl m-auto">
      <CartHeader />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">
        <CartList items={cart.cartItems} />

        <CartSummary total={total} />
      </div>
    </div>
  );
}

export function CartHeader() {
  return (
    <div className="py-3 px-4 md:px-0">
      <h1 className="text-3xl font-semibold">Shopping Cart</h1>

      <p className="text-muted-foreground mt-2">
        Review and update your items.
      </p>
    </div>
  );
}

type CartListProps = {
  items: NonNullable<Awaited<ReturnType<typeof getCart>>["cart"]>["cartItems"];
};

export function CartList({ items }: CartListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export function CartItem({
  item,
}: {
  item: NonNullable<
    Awaited<ReturnType<typeof getCart>>["cart"]
  >["cartItems"][number];
}) {
  const imageUrl =
    item.variant.product.images.length > 0
      ? item.variant.product.images[0]
      : "/images/dummy-image.jpg";

  const subTotal =
    (item.variant.product.basePrice + item.variant.priceDiff) * item.qty;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.variant.product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className=" overflow-hidden">
            <Image height={100} width={100} alt="cart-img" src={imageUrl} />
          </div>
          <div className="flex-1 ">
            <div>
              <p className="text-muted-foreground text-sm"></p>

              <div className="mt-4 flex items-center justify-between">
                <QuantitySelector item={item} />

                <RemoveCartItem cartItemId={item.id} />
              </div>
            </div>
            <div className="text-lg pt-2 ">&#2547;{subTotal}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function QuantitySelector({
  item,
}: {
  item: NonNullable<
    Awaited<ReturnType<typeof getCart>>["cart"]
  >["cartItems"][number];
}) {
  const [pending, startTransition] = useTransition();
  const qc = useQueryClient();

  const updateQty = (qty: number) => {
    startTransition(async () => {
      const res = await updateCartItemQuantity({
        cartItemId: item.id,
        qty,
      });
      toast.message(res.message);
      qc.invalidateQueries({ queryKey: ["cart"] });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        disabled={pending}
        onClick={() => updateQty(item.qty - 1)}
      >
        <Minus />
      </Button>

      <div className="w-8 text-center ">
        {pending ? (
          <Loader2 className="size-4 animate-spin mx-auto" />
        ) : (
          item.qty
        )}
      </div>

      <Button
        size="icon"
        variant="outline"
        disabled={pending}
        onClick={() => updateQty(item.qty + 1)}
      >
        <Plus />
      </Button>
    </div>
  );
}

export function RemoveCartItem({ cartItemId }: { cartItemId: string }) {
  const [pending, startTransition] = useTransition();
  const qc = useQueryClient();
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await deleteCartItem(cartItemId);
        });
        qc.invalidateQueries({ queryKey: ["cart"] });
      }}
    >
      <Trash2 className="size-4" />
    </Button>
  );
}

export function CartSummary({ total }: { total: number }) {
  return (
    <Card className="h-fit p-4 sticky top-6">
      <h2 className="font-semibold">Cart Summary</h2>

      <div className="mt-6 flex justify-between">
        <span>Total Amount</span>

        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>

      <Button
        nativeButton={false}
        className="mt-6 w-full"
        render={<Link href={"/checkout"}></Link>}
      >
        Procced
      </Button>
    </Card>
  );
}

export function EmptyCart() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <ShoppingCart className="size-12 text-muted-foreground" />

      <h2 className="mt-4 text-xl font-medium">Your cart is empty</h2>

      <p className="text-muted-foreground mt-2">Add products to get started.</p>
    </div>
  );
}
