"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

import { getCart } from "../server/cart.query";

import { CartSheetSkeleton } from "./cart-sheet-skeleton";
import { CartList } from "./cart-list";
import { useRouter } from "next/navigation";

export function CartSheet({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const total =
    data?.cartItems.reduce((acc, item) => {
      const price = item.variant.product.basePrice + item.variant.priceDiff;

      return acc + price * item.qty;
    }, 0) ?? 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        nativeButton={false}
        render={
          <span className="relative">
            {children}

            <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white md:-right-1 md:-top-1">
              {data?.cartItemsCount ?? 0}
            </span>
          </span>
        }
      />

      <SheetContent className="flex w-5/6 flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>

          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {isPending ? (
            <CartSheetSkeleton />
          ) : (
            <CartList cartItems={data?.cartItems ?? []} />
          )}
        </div>

        <SheetFooter className="border-t pt-4">
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Total</div>

              <div className="text-lg font-semibold">৳{total}</div>
            </div>

            <Button
              onClick={() => {
                router.push("/checkout");
                setOpen(false);
              }}
              disabled={!data?.cartItems.length}
            >
              Proceed
              <ArrowRight />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
