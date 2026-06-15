import { Suspense } from "react";
import { InventoryHeader } from "../components/inventory-header";
import { getAllInventory } from "../server/inventory.query";
import { inventoryColumn } from "../components/inventory-column";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";

export function InventoryPage() {
  return (
    <div className=" space-y-3">
      <InventoryHeader />
      <Suspense fallback={<DataTableSkeleton rows={10} />}>
        <InventoryListingTable />
      </Suspense>
    </div>
  );
}

async function InventoryListingTable() {
  const data = await getAllInventory();

  return (
    <div>
      <DataTable columns={inventoryColumn} data={data} />
    </div>
  );
}
