"use client";

import { Button } from "@/components/ui/button";
import { Edit, ShoppingBag, Trash2 } from "lucide-react";
import {
  getProductsByCategory,
  removeProductFromCategory,
} from "../server/single.category.action";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SingleCategoryProducts({
  info,
}: {
  info: Pick<
    NonNullable<Awaited<ReturnType<typeof getProductsByCategory>>>,
    "products"
  >;
}) {
  const { products } = info;
  return (
    <div className="px-4 md:px-0">
      {products.length === 0 && (
        <div className="w-full h-32 text-muted-foreground text-sm border  border-dashed flex items-center justify-center">
          No Products !
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {products.map((item) => {
          return (
            <div
              key={item.productId}
              className={`group flex w-full items-center justify-between  border p-3 text-left transition-all`}
            >
              <div className="flex items-center gap-3 overflow-hidden cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center  bg-muted">
                  <ShoppingBag className="h-5 w-5" />
                </div>

                <div className="overflow-hidden">
                  <p className="truncate font-medium">{item.product.name}</p>
                </div>
              </div>
              <div>
                <DeleteFromCategory
                  categoryId={item.categoryId}
                  productId={item.productId}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeleteFromCategory({
  categoryId,
  productId,
}: {
  categoryId: string;
  productId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      disabled={isPending}
      variant={"destructive"}
      onClick={() => {
        startTransition(async () => {
          const res = await removeProductFromCategory(productId, categoryId);
          toast.success(res.message);
          router.refresh();
        });
      }}
    >
      <Trash2 />
    </Button>
  );
}
