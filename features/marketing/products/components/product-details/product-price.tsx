import { calculatePrice } from "@/helpers/caculations";
import { Badge } from "@/components/ui/badge";
import { DetailsProductType } from "@/features/marketing/types/product.type";

export function ProductPrice({ product }: { product: DetailsProductType }) {
  return (
    <h2 className="space-x-2 text-2xl font-semibold tracking-tight">
      <span>
        &#2547;
        {calculatePrice(product.basePrice, product.discountInPercent, 0)}
      </span>
      {product.onSale && (
        <>
          <span className="text-muted-foreground text-sm line-through ">
            &#2547;{product.basePrice}
          </span>

          <Badge className="">-{product.discountInPercent}%</Badge>
        </>
      )}
    </h2>
  );
}
