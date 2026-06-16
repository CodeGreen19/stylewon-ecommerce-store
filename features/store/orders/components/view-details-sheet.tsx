import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  CreditCard,
  MapPin,
  ShoppingBag,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrderDetailsByOrderId } from "../server/orders.query";

// --- Types ---
type OrderDetails = Awaited<ReturnType<typeof getOrderDetailsByOrderId>>;

interface ViewDetailsSheetProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  orderId: string;
}

// --- Main Sheet Container ---
export function ViewDetailsSheet({
  open,
  setOpen,
  orderId,
}: ViewDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-lg w-full p-0">
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Details
          </SheetTitle>
        </SheetHeader>

        {/* ScrollArea ensures content doesn't overflow the viewport ungracefully */}
        <ScrollArea className="h-[calc(100vh-5rem)] px-6 pb-6">
          {open && <OrderDetailsContent orderId={orderId} />}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// --- Data Fetcher & State Controller Component ---
function OrderDetailsContent({ orderId }: { orderId: string }) {
  const {
    data: order,
    isPending,
    isError,
    error,
  } = useQuery<OrderDetails>({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderDetailsByOrderId(orderId),
    enabled: !!orderId, // Only fetch if an orderId exists
  });

  if (isPending) return <OrderDetailsSkeleton />;
  if (isError)
    return (
      <OrderDetailsError
        message={
          error instanceof Error ? error.message : "Failed to load order"
        }
      />
    );
  if (!order) return <OrderDetailsError message="No order details found." />;

  return <OrderDetailsView order={order} />;
}

// --- Presentation Component for Data Success ---
function OrderDetailsView({ order }: { order: OrderDetails }) {
  const statusColors: Record<string, string> = {
    pending:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    confirmed:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    processing:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    shipped:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    delivered:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    cancelled: "bg-destructive/10 text-destructive",
    refunded: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  };

  const paymentColors: Record<string, string> = {
    pending:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    failed: "bg-destructive/10 text-destructive",
    refunded: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Overview Block */}
      <div className="flex flex-col gap-1.5">
        <div className="text-sm text-muted-foreground">Order Number</div>
        <div className="text-lg font-semibold tracking-tight">
          {order.orderNumber}
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          <Badge variant="outline" className={statusColors[order.status] || ""}>
            {order.status.toUpperCase()}
          </Badge>
          <Badge
            variant="outline"
            className={paymentColors[order.paymentStatus] || ""}
          >
            Payment: {order.paymentStatus}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Customer & Shipping Section */}
      <div className="space-y-4">
        <div className="flex items-start gap-3 text-sm">
          <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground">{order.fullName}</p>
            <p className="text-muted-foreground">{order.phoneNumber}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground">Shipping Address</p>
            <p className="text-muted-foreground leading-relaxed">
              {order.shippingAddress}
            </p>
          </div>
        </div>

        {order.notes && (
          <div className=" bg-muted/50 p-3 text-sm border">
            <span className="font-semibold text-xs block mb-1 text-muted-foreground">
              Order Notes:
            </span>
            {order.notes}
          </div>
        )}
      </div>

      <Separator />

      {/* Order Items */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm tracking-tight text-muted-foreground">
          Items Ordered
        </h3>
        <div className="space-y-3">
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start gap-4 text-sm bg-card p-3 border"
            >
              <div className="space-y-1">
                <p className="font-medium leading-none">{item.productTitle}</p>
                <p className="text-xs text-muted-foreground">
                  {item.variantLabel} {item.sku ? `(৳{item.sku})` : ""}
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  Qty: {item.quantity} × ৳{item.unitPrice.toFixed(2)}
                </p>
              </div>
              <span className="font-medium shrink-0">
                ৳{item.subtotal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Block */}
      <Card className="bg-muted/40 shadow-none border-dashed">
        <CardContent className="p-4 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>৳{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span>৳{order.shippingFee.toFixed(2)}</span>
          </div>
          {order.discount && order.discount > 0 ? (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
              <span>Discount</span>
              <span>-৳{order.discount.toFixed(2)}</span>
            </div>
          ) : null}
          <Separator className="my-2" />
          <div className="flex justify-between items-center text-base font-semibold">
            <span>Total Amount</span>
            <span className="text-lg">৳{order.total.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1.5 border-t border-muted">
            <CreditCard className="h-3 w-3" />
            <span>Paid via {order.paymentMethod}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- UI Subcomponent: Skeleton Loader ---
function OrderDetailsSkeleton() {
  return (
    <div className="space-y-6 mt-6 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 " />
          <Skeleton className="h-5 w-24 " />
        </div>
      </div>
      <Separator />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Separator />
      <div className="space-y-3">
        <Skeleton className="h-16 w-full " />
        <Skeleton className="h-16 w-full " />
      </div>
      <Card className="shadow-none">
        <CardContent className="p-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-5 w-1/2" />
        </CardContent>
      </Card>
    </div>
  );
}

// --- UI Subcomponent: Error State ---
function OrderDetailsError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 mt-12 border border-dashed  bg-destructive/5 text-destructive">
      <AlertCircle className="h-10 w-10 mb-3 stroke-[1.5]" />
      <h4 className="font-semibold text-sm mb-1">Unable to Display Order</h4>
      <p className="text-xs text-muted-foreground max-w-xs">{message}</p>
    </div>
  );
}
