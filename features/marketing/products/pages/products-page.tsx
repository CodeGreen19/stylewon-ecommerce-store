import { ProductsFilter } from "../components/products-filter";
import { ProductsListings } from "../components/products-listings";

export function ProductsPage() {
  return (
    <div className=" py-4 md:py-8 flex flex-col md:flex-row">
      <ProductsFilter />
      <ProductsListings />
    </div>
  );
}
