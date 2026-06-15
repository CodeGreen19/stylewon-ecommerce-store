import { Skeleton } from "@/components/ui/skeleton";
import { StorePageHeaderSkeleton } from "../../shared/components/store-page-header";

export default function SingleCategoryProductsSkeleton() {
  return (
    <div>
      <StorePageHeaderSkeleton />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
function ProductCardSkeleton() {
  return (
    <div className="flex items-center justify-between border p-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-none" />

        <div>
          <Skeleton className="mb-2 h-3 w-20" />
        </div>
      </div>

      <div className="flex gap-1">
        <Skeleton className="h-8 w-8 rounded-sm" />
      </div>
    </div>
  );
}
