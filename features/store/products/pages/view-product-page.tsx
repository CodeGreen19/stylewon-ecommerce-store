import { Suspense } from "react";
import { SingleProductView } from "../components/single-product-view";
import { getSingleProduct } from "../server/products.action";

export function ViewProductPage({
  params,
}: PageProps<"/store/products/[id]/view">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewsProduct params={params} />
    </Suspense>
  );
}

async function ViewsProduct({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const [singleProduct] = await getSingleProduct(id);

  return <SingleProductView product={singleProduct} />;
}
