import { Skeleton } from "@/components/ui/skeleton";

interface ProductTableSkeletonProps {
  rows?: number;
}

export function DataTableSkeleton({ rows = 10 }: ProductTableSkeletonProps) {
  return (
    <div className="w-full space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 md:px-0">
        <Skeleton className="h-10 w-full max-w-md" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-hidden border">
          {/* Header */}
          <div className="grid grid-cols-[50px_1.5fr_200px_200px_80px] items-center border-b px-4 py-4">
            <Skeleton className="h-5 w-5" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-4" />
            </div>

            <div />
          </div>

          {/* Rows */}
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[50px_1.5fr_200px_200px_80px] items-center border-b px-4 py-4"
            >
              {/* Checkbox */}
              <Skeleton className="h-5 w-5" />

              {/* Product */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 " />

                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              {/* Price */}
              <Skeleton className="h-5 w-20" />

              {/* Stock */}
              <Skeleton className="h-5 w-24" />

              {/* Actions */}
              <Skeleton className="ml-auto h-5 w-5" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className=" border p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-14 w-14  shrink-0" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-20" />

                <div className="flex justify-between pt-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <Skeleton className="h-5 w-5 " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
