import { UpdateProductPage } from "@/features/store/products/pages/update-product-page";

export default function page(props: PageProps<"/store/products/[id]/update">) {
  return <UpdateProductPage {...props} />;
}
