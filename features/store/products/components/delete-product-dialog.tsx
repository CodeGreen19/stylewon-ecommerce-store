"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductColumnType } from "./products-column";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { deleteSingleProduct } from "../server/products.action";
import { toast } from "sonner";

export function DeleteProductDialog({
  deleteProduct,
  closeDialog,
}: {
  deleteProduct: ProductColumnType | null;
  closeDialog: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Dialog
      open={!!deleteProduct}
      onOpenChange={(open) => {
        if (open === false) {
          closeDialog();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p className=" text-xl">Name : {deleteProduct?.name}</p>
        </div>
        <DialogFooter>
          <Button variant={"secondary"}>Cancel</Button>
          <Button
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                if (deleteProduct) {
                  const res = await deleteSingleProduct(deleteProduct.id);
                  closeDialog();
                  toast.success(res.message);
                }
              });
            }}
            variant={"destructive"}
          >
            Delete <Trash />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
