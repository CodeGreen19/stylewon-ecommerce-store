"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { getUserOrders } from "../server/orders.query";

// ============================================================================
// Types
// ============================================================================
type Orders = Awaited<ReturnType<typeof getUserOrders>>;
type Order = Orders[number];
type OrderItem = Order["orderItems"][number];

// ============================================================================
// Main Container Component
// ============================================================================
export function OrdersLists({ ordersInfo }: { ordersInfo: Orders }) {
  if (!ordersInfo?.length) {
    return (
      <Card className="rounded-none border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            No orders found
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            When you place an order, it will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {ordersInfo.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

// ============================================================================
// Sub-Components
// ============================================================================
function OrderCard({ order }: { order: Order }) {
  return (
    <Card className="rounded-none transition-all duration-200 hover:border-muted-foreground/30">
      <Collapsible className="group">
        <OrderHeader order={order} />
        <OrderDetails order={order} />
      </Collapsible>
    </Card>
  );
}

function OrderHeader({ order }: { order: Order }) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <CardHeader className="pb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <CardTitle className="font-mono text-sm tracking-tight">
              #{order.id.slice(0, 8).toUpperCase()}
            </CardTitle>
            <Badge
              variant="outline"
              className="rounded-none border-muted-foreground/30 bg-muted/30 px-2 py-0 text-[11px] font-medium uppercase tracking-wider"
            >
              {order.status}
            </Badge>
          </div>
          <CardDescription className="text-xs">{formattedDate}</CardDescription>
        </div>

        <div className="flex items-center justify-between gap-8 sm:text-right">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Total Amount
            </p>
            <p className="text-base font-semibold tabular-nums text-foreground">
              ৳{order.total.toLocaleString()}
            </p>
          </div>

          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-none p-0 border border-muted"
              >
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                <span className="sr-only">Toggle order details</span>
              </Button>
            }
          ></CollapsibleTrigger>
        </div>
      </div>
    </CardHeader>
  );
}

function OrderDetails({ order }: { order: Order }) {
  return (
    <CollapsibleContent className="data-[state=closed]:animate-none data-[state=open]:animate-none">
      <CardContent className="pt-0 space-y-6">
        <Separator className="bg-muted/60" />

        {/* Meta Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <OrderShippingInfo order={order} />
          <OrderPaymentInfo order={order} />
        </div>

        {/* Product Items */}
        <OrderItemsList items={order.orderItems} />

        {/* Pricing Summary */}
        <div className="flex justify-end pt-2">
          <OrderTotals order={order} />
        </div>
      </CardContent>
    </CollapsibleContent>
  );
}

function OrderShippingInfo({ order }: { order: Order }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        Shipping Details
      </h4>
      <div className="space-y-0.5 text-sm text-muted-foreground font-normal">
        <p className="font-medium text-foreground">{order.fullName}</p>
        <p>{order.phoneNumber}</p>
        <p className="leading-relaxed">{order.shippingAddress}</p>
      </div>
    </div>
  );
}

function OrderPaymentInfo({ order }: { order: Order }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        Payment Information
      </h4>
      <div className="space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground/70">Method:</span>
          <span className="font-medium text-foreground">
            {order.paymentMethod}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground/70">Status:</span>
          <span className="text-xs uppercase tracking-wider font-semibold text-foreground">
            {order.paymentStatus}
          </span>
        </div>
      </div>
    </div>
  );
}

function OrderItemsList({ items }: { items: OrderItem[] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        Line Items
      </h4>
      <div className="divide-y border border-muted divide-muted">
        {items.map((item) => (
          <OrderItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function OrderItemRow({ item }: { item: OrderItem }) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/10">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">
          {item.productTitle}
        </p>
        {item.variantLabel && (
          <p className="text-xs text-muted-foreground font-mono">
            {item.variantLabel}
          </p>
        )}
      </div>

      <div className="text-right space-y-0.5">
        <p className="text-xs text-muted-foreground tabular-nums">
          Qty {item.quantity}
        </p>
        <p className="text-sm font-semibold tabular-nums text-foreground">
          ৳{item.subtotal.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function OrderTotals({ order }: { order: Order }) {
  return (
    <div className="w-full max-w-xs space-y-2 border border-muted bg-muted/5 p-4">
      <PriceRow label="Subtotal" value={order.subtotal} />
      <PriceRow label="Shipping Fee" value={order.shippingFee} />
      {!!order.discount && (
        <PriceRow
          label="Discount Applied"
          value={-order.discount}
          className="text-emerald-600 dark:text-emerald-400"
        />
      )}
      <Separator className="my-2" />
      <PriceRow
        label="Grand Total"
        value={order.total}
        bold
        className="text-base text-foreground"
      />
    </div>
  );
}

function PriceRow({
  label,
  value,
  bold,
  className = "",
}: {
  label: string;
  value: number;
  bold?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-between text-xs tabular-nums text-muted-foreground ${className}`}
    >
      <span className={bold ? "font-medium text-foreground" : ""}>{label}</span>
      <span className={bold ? "font-bold text-foreground" : ""}>
        ৳{value.toLocaleString()}
      </span>
    </div>
  );
}
