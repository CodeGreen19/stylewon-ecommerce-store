import React, { Suspense } from "react";
import { AccountHeader } from "../components/account-header";
import { getUserOrders } from "../server/orders.query";
import { OrdersLists } from "../components/orders-lists";
import { OrdersListsSkeleton } from "../components/orders-lists-skeleton";

export function OrdersPage() {
  return (
    <div>
      <AccountHeader
        label="Orders"
        descriptions="View and truck your orders."
      />

      <Suspense fallback={<OrdersListsSkeleton />}>
        <ShowOrders />
      </Suspense>
    </div>
  );
}

async function ShowOrders() {
  const orders = await getUserOrders();
  return <OrdersLists ordersInfo={orders} />;
}
