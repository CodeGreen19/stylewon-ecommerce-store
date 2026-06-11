"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { OrdersColumnType } from "./orders-column";

export function ChangeStatusDialog({
  order,
  closeDialog,
}: {
  order: OrdersColumnType | null;
  closeDialog: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Dialog
      open={!!order}
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
          <p className=" text-xl">Status : {order?.status}</p>
        </div>
        <DialogFooter>
          <Button variant={"secondary"}>Cancel</Button>
          <Button
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                if (order) {
                  //   const res = await deleteSingleProduct(deleteProduct.id);
                  //   closeDialog();
                  //   toast.success(res.message);
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
