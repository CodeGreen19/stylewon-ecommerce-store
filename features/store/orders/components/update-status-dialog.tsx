import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, AlertTriangle, RefreshCw, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { changeOrderStatusByOrderId } from "../server/order.action";
import { ORDER_STATUS } from "@/constants/orders";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Defining standard status options to sync with your DB schema types
const ORDER_STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    description: "Order has been placed but not processed yet.",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    description: "Order is verified and accepted.",
  },
  {
    value: "processing",
    label: "Processing",
    description: "Items are being picked and packed.",
  },
  {
    value: "shipped",
    label: "Shipped",
    description: "Package has been handed over to the courier.",
  },
  {
    value: "delivered",
    label: "Delivered",
    description: "Customer has received the package.",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    description: "Order is terminated before fulfillment.",
  },
  {
    value: "refunded",
    label: "Refunded",
    description: "Payment returned back to customer.",
  },
] as const;

type OrderStatus = (typeof ORDER_STATUS_OPTIONS)[number]["value"];

interface UpdateStatusDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  orderId: string;
  currentStatus?: OrderStatus; // Optional: Pass current status to pre-populate dropdown
}

export function UpdateStatusDialog({
  open,
  setOpen,
  orderId,
  currentStatus,
}: UpdateStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");
  const queryClient = useQueryClient();
  const router = useRouter();

  // Handle setting initial status when dialog mounts or changes
  const onOpenChangeWrapper = (isOpen: boolean) => {
    if (isOpen && currentStatus) {
      setSelectedStatus(currentStatus);
    } else if (!isOpen) {
      setSelectedStatus(""); // Reset state when closed
    }
    setOpen(isOpen);
  };

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: () =>
      changeOrderStatusByOrderId({
        orderId,
        status: selectedStatus as (typeof ORDER_STATUS)[number], // Casted dynamically based on your schema config
      }),
    onSuccess: (data) => {
      // Invalidate the cache to instantly reflect the update across your UI
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      toast.success("Order status updated successfully.");
      setOpen(false); // Close dialog on success
      router.refresh();
    },
    onError: (error) => {
      toast.error("Something went wrong.");
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedStatus) return;
    updateStatus();
  };

  // Find explanation paragraph for the selected choice
  const activeOptionDescription = ORDER_STATUS_OPTIONS.find(
    (opt) => opt.value === selectedStatus,
  )?.description;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <RefreshCw
              className={`h-4 w-4 ${isPending ? "animate-spin text-primary" : "text-muted-foreground"}`}
            />
            Update Order Status
          </DialogTitle>
          <DialogDescription className="text-xs">
            Modify the workflow placement for Order ID:{" "}
            <code className="bg-muted px-1 py-0.5 text-[11px] font-mono font-medium text-foreground">
              {orderId}
            </code>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-3">
          <div className="space-y-2">
            <Label
              htmlFor="status-select"
              className="text-sm font-medium text-muted-foreground"
            >
              Choose Target Status
            </Label>
            <Select
              disabled={isPending}
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as OrderStatus)}
            >
              <SelectTrigger id="status-select" className="w-full h-11">
                <SelectValue placeholder="Select updated progress state..." />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {ORDER_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="font-medium">{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic contextual explanation field */}
          {selectedStatus && (
            <div
              className={`p-3 border text-xs flex gap-2.5 items-start transition-all duration-200 ${
                selectedStatus === "cancelled" || selectedStatus === "refunded"
                  ? "bg-destructive/5 text-destructive border-destructive/10"
                  : "bg-muted/40 text-muted-foreground border-border"
              }`}
            >
              {selectedStatus === "cancelled" ||
              selectedStatus === "refunded" ? (
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
              )}
              <div>
                <span className="font-semibold block mb-0.5 capitalize text-foreground">
                  Status Impact: {selectedStatus}
                </span>
                {activeOptionDescription}
              </div>
            </div>
          )}

          <DialogFooter className="pt-2 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isPending || !selectedStatus || selectedStatus === currentStatus
              }
              className="w-full sm:w-auto min-w-25"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
