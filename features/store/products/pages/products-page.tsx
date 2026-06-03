import { DataTable } from "@/components/table/data-table";
import { Suspense } from "react";
import { productsColumn } from "../components/products-column";
import { ProductsHeader } from "../components/products-header";
import { getAllProducts } from "../server/products.query";

export function ProductsPage() {
  return (
    <div className=" space-y-3">
      <ProductsHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsListing />
      </Suspense>
    </div>
  );
}

async function ProductsListing() {
  const data = await getAllProducts();

  return (
    <div>
      <DataTable columns={productsColumn} data={data} />
    </div>
  );
}
