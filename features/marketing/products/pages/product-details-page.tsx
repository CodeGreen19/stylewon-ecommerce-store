import { Suspense } from "react";
import { ShowImages } from "../components/show-images";
import { getSingleProductById } from "../server/product.action";
import { ProductDetails } from "../components/product-details/index";

export async function ProductDetailsPage(props: PageProps<"/products/[slug]">) {
  const productId = (await props.params).slug;
  return (
    <Suspense>
      <ProductDetailsListings productId={productId} />
    </Suspense>
  );
}

async function ProductDetailsListings({ productId }: { productId: string }) {
  const product = await getSingleProductById(productId);
  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 max-w-7xl m-auto">
      <ShowImages images={product.images} />
      <ProductDetails product={product} />
    </div>
  );
}
