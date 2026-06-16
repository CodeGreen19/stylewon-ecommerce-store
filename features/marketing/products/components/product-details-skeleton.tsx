import { Skeleton } from "@/components/ui/skeleton";

export function ProductPageSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-4 lg:grid-cols-2">
      <ProductImagesSkeleton />
      <ProductDetailsSkeleton />
    </div>
  );
}

function ProductImagesSkeleton() {
  return (
    <div className="flex gap-4">
      <div className="hidden flex-col gap-3 sm:flex">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-16 w-16 shrink-0 rounded-none bg-white"
          />
        ))}
      </div>

      <div className="flex gap-2 sm:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-12 shrink-0 bg-white" />
        ))}
      </div>

      <div className="flex-1">
        <Skeleton className="aspect-square w-full rounded-none bg-white" />
      </div>
    </div>
  );
}

function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-12 w-3/4 bg-white" />

      <div className="mt-8 flex items-center gap-3">
        <Skeleton className="h-10 w-24 bg-white" />
        <Skeleton className="h-6 w-16 bg-white" />
        <Skeleton className="h-5 w-12 bg-white" />
      </div>

      <div className="my-8 border-t" />

      <div>
        <Skeleton className="mb-5 h-6 w-16 bg-white" />

        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-12 w-28 bg-white" />
          <Skeleton className="h-12 w-28 bg-white" />
          <Skeleton className="h-12 w-28 bg-white" />
        </div>
      </div>

      <div className="mt-10">
        <Skeleton className="mb-5 h-6 w-14 bg-white" />

        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-12 w-18 bg-white" />
          <Skeleton className="h-12 w-18 bg-white" />
          <Skeleton className="h-12 w-18 bg-white" />
          <Skeleton className="h-12 w-18 bg-white" />
        </div>
      </div>

      <div className="my-8 border-t" />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex">
          <Skeleton className="h-12 w-16 rounded-none bg-white" />
          <Skeleton className="h-12 w-16 rounded-none border-x bg-white" />
          <Skeleton className="h-12 w-16 rounded-none bg-white" />
        </div>

        <Skeleton className="h-12 flex-1 rounded-none bg-white" />
      </div>
    </div>
  );
}
