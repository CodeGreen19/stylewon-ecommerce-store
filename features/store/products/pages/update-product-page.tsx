import { Suspense } from "react";
import { ProductForm } from "../components/product-form";
import { getSingleProduct } from "../server/products.action";
import ProductFormSkeleton from "../components/product-form/product-form-skeleton";

export function UpdateProductPage({
  params,
}: PageProps<"/store/products/[id]/update">) {
  return (
    <Suspense fallback={<ProductFormSkeleton />}>
      <UpdateProductForm params={params} />
    </Suspense>
  );
}

async function UpdateProductForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const [singleProduct] = await getSingleProduct(id);
  console.log(singleProduct, "singleProduct");

  return (
    <ProductForm
      type="UPDATE"
      existedValues={{
        ...singleProduct,
        productId: id,
        description: singleProduct.description || "",
        images: singleProduct.images || [],
        productOptions: singleProduct.productOptions.map((v) => ({
          ...v,
          values: v.values.map((val) => ({
            ...val,
            color: val.color ?? undefined,
          })),
        })),
        productVariants: singleProduct.productVariants.map((v) => ({
          ...v,
          sku: v.sku || "",
        })),
      }}
    />
  );
}
