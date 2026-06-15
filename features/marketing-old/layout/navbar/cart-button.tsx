"use client";

import { useQuery } from "@tanstack/react-query";
import { getCartCount } from "../../cart/server/cart.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

export function CartButton() {
  const { data } = useQuery({
    queryKey: ["cart-count"],
    queryFn: () => getCartCount(),
  });
  return (
    <Button
      nativeButton={false}
      render={<Link href={"/cart"} />}
      variant={"ghost"}
      size={"icon-lg"}
      className={"relative flex flex-col"}
    >
      <ShoppingCartIcon className="size-5" />
      {data && data.count > 0 && (
        <div className="size-4 absolute top-0 right-2">{data.count}</div>
      )}
      <span>Cart</span>
    </Button>
  );
}
