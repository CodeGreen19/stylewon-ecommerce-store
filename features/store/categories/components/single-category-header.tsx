"use client";

import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { Fragment, useEffect, useState, useTransition } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  addProductToCategory,
  fetchProducts,
} from "../server/single.category.action";
import Image from "next/image";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SingleCategoryHeader({
  categoryName,
  productsCount,
  categoryId,
}: {
  categoryName: string;
  productsCount: number;
  categoryId: string;
}) {
  return (
    <Card className="p-0 md:ring-0 bg-background">
      <CardHeader className="p-4 md:p-0">
        <CardTitle className="text-2xl font-bold truncate">
          {categoryName}
        </CardTitle>
        <CardDescription>{productsCount} products</CardDescription>
        <CardAction>
          <ProductsAddDialogButton categoryId={categoryId} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}

function ProductsAddDialogButton({ categoryId }: { categoryId: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            Add Products <Plus className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="h-[90vh]">
        <ProductList setOpen={setOpen} categoryId={categoryId} />
      </DialogContent>
    </Dialog>
  );
}

export function ProductList({
  categoryId,
  setOpen,
}: {
  categoryId: string;
  setOpen: (v: boolean) => void;
}) {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") return null;
  if (status === "error") {
    return (
      <p className="p-8 text-xs text-neutral-400">
        Error: {(error as Error).message}
      </p>
    );
  }

  // Prevent runtime error if data or data.pages is undefined
  const pages = data?.pages ?? [];

  function handleSelect(productId: string) {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((n) => productId !== n)
        : [...prev, productId],
    );
  }

  return (
    <Fragment>
      <DialogHeader>
        <DialogTitle className={"text-xl"}>Products</DialogTitle>
        <DialogDescription>Add products to you cateogry</DialogDescription>
      </DialogHeader>
      <div className="h-[60vh] overflow-y-auto overflow-x-hidden">
        <div>
          {pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.products.map((product) => {
                const isSelected = selectedProductIds.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-4 hover:bg-muted group p-2"
                    onClick={() => handleSelect(product.id)}
                  >
                    <Image
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : "/images/dummy-image.jpg"
                      }
                      height={40}
                      width={40}
                      alt="productImg"
                      className=" size-9 object-cover"
                    />
                    <h1 className="flex-1 truncate"> {product.name}</h1>
                    <Checkbox
                      onClick={() => handleSelect(product.id)}
                      checked={isSelected}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div
          ref={ref}
          className="mt-20 flex justify-center py-4 text-[10px] tracking-widest uppercase text-neutral-400"
        >
          {isFetchingNextPage ? (
            <span className="animate-pulse">Loading</span>
          ) : (
            !hasNextPage && (
              <span className="opacity-50">End of Collection</span>
            )
          )}
        </div>
      </div>
      <DialogFooter>
        <Field orientation={"horizontal"} className="justify-end">
          <DialogClose
            render={<Button variant={"secondary"}>Cancel</Button>}
          ></DialogClose>
          <SaveToCategory
            close={() => setOpen(false)}
            productIds={selectedProductIds}
            categoryId={categoryId}
          />
        </Field>
      </DialogFooter>
    </Fragment>
  );
}

function SaveToCategory({
  categoryId,
  productIds,
  close,
}: {
  categoryId: string;
  productIds: string[];
  close: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      disabled={isPending || !productIds.length}
      onClick={() => {
        startTransition(async () => {
          const res = await addProductToCategory(productIds, categoryId);
          toast.success(res.message);
          router.refresh();
          close();
        });
      }}
    >
      Save
    </Button>
  );
}
