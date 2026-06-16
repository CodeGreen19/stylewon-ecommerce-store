import { Suspense } from "react";
import { ProductDetails } from "../components/product-details/index";
import { getSingleProductById } from "../server/products.query";
import { ProductImages } from "../components/product-images";
import { ProductPageSkeleton } from "../components/product-details-skeleton";

export async function ProductDetailsPage(props: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductDetailsListings {...props} />
    </Suspense>
  );
}

async function ProductDetailsListings(props: PageProps<"/products/[slug]">) {
  const productId = (await props.params).slug;
  const product = await getSingleProductById(productId);
  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 max-w-7xl m-auto">
      <ProductImages images={product.images} />
      <ProductDetails product={product} />
    </div>
  );
}
