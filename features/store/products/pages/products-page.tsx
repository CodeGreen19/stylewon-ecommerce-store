import { DataTable } from "@/components/table/data-table";
import { Suspense } from "react";
import { productsColumn } from "../components/products-column";
import { getAllProducts } from "../server/products.query";
import { StorePageHeader } from "../../shared/components/store-page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";

export function ProductsPage() {
  return (
    <div className=" space-y-3">
      <StorePageHeader
        title="View Products"
        description="This is view products page desciptions"
        action={
          <Button
            nativeButton={false}
            render={<Link href={"/store/products/add-new"} />}
          >
            Add New <Plus />
          </Button>
        }
      />
      <Suspense fallback={<DataTableSkeleton rows={10} />}>
        <ProductsListingTable />
      </Suspense>
    </div>
  );
}

async function ProductsListingTable() {
  const data = await getAllProducts();

  return (
    <div>
      <DataTable columns={productsColumn} data={data} />
    </div>
  );
}
