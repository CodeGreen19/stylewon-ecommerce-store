import { Suspense } from "react";

import { DataTable } from "@/components/table/data-table";
import { OrdersHeader } from "../components/orders-header";

import { ordersColumn } from "../components/orders-column";
import { getOrders } from "../server/orders.query";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";

export function OrdersPage() {
  return (
    <div className=" space-y-3">
      <OrdersHeader />
      <Suspense fallback={<DataTableSkeleton />}>
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
