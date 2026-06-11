import { Suspense } from "react";

import { DataTable } from "@/components/table/data-table";
import { OrdersHeader } from "../components/orders-header";
import { getOrders } from "../server/order.action";
import { ordersColumn } from "../components/orders-column";

export function OrdersPage() {
  return (
    <div className=" space-y-3">
      <OrdersHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <OrdersListing />
      </Suspense>
    </div>
  );
}

async function OrdersListing() {
  const data = await getOrders();

  return (
    <div>
      <DataTable columns={ordersColumn} data={data} />
    </div>
  );
}
