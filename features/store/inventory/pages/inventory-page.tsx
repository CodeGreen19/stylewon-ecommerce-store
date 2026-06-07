import { Suspense } from "react";
import { InventoryHeader } from "../components/inventory-header";
import { getAllInventory } from "../server/inventory.query";
import { inventoryColumn } from "../components/inventory-column";
import { DataTable } from "@/components/table/data-table";

export function InventoryPage() {
  return (
    <div className=" space-y-3">
      <InventoryHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <InventoryListing />
      </Suspense>
    </div>
  );
}

async function InventoryListing() {
  const data = await getAllInventory();

  return (
    <div>
      <DataTable columns={inventoryColumn} data={data} />
    </div>
  );
}
