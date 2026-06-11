import { calculatePrice } from "@/helpers/caculations";
import { DetailsProductType } from "../../types/product.type";
import { Badge } from "@/components/ui/badge";

export function ProductPrice({ product }: { product: DetailsProductType }) {
  return (
    <h2 className="space-x-2 text-2xl font-semibold tracking-tight">
      <span>
        &#2547;
        {calculatePrice(product.basePrice, product.discountInPercent, 0)}
      </span>
      {product.onSale && (
        <>
          <del className="text-destructive">
            <span className="text-muted-foreground ">
              &#2547;{product.basePrice}
            </span>
          </del>
          <Badge className="-translate-y-1.5">
            -{product.discountInPercent}%
          </Badge>
        </>
      )}
    </h2>
  );
}
