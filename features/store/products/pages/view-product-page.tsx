import { Suspense } from "react";
import { ViewProduct } from "../components/view-product";
import { getSingleProduct } from "../server/products.action";
import { ViewProductSkeleton } from "../components/product-form/view-product-skeleton";

export function ViewProductPage({
  params,
}: PageProps<"/store/products/[id]/view">) {
  return (
    <Suspense fallback={<ViewProductSkeleton />}>
      <Show params={params} />
    </Suspense>
  );
}

async function Show({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const [singleProduct] = await getSingleProduct(id);

  return <ViewProduct product={singleProduct} />;
}
