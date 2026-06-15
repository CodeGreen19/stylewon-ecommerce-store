import { Skeleton } from "@/components/ui/skeleton";

export function ViewProductSkeleton() {
  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Skeleton className="h-10 w-72" />
          <Skeleton className="mt-3 h-4 w-96 max-w-full" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      {/* Top Overview Section */}
      <div className="border bg-card p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-112.5 max-w-full" />
              <Skeleton className="h-4 w-95 max-w-full" />
            </div>

            <div className="hidden md:block">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-52" />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        {/* Product Image */}
        <div className="border bg-card p-4">
          <Skeleton className="aspect-4/5 w-full" />
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="border bg-card p-6">
            <Skeleton className="mb-6 h-7 w-64" />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border p-5">
                <Skeleton className="mb-3 h-4 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>

              <div className="border p-5">
                <Skeleton className="mb-3 h-4 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>

          <div className="border bg-card p-6">
            <Skeleton className="mb-6 h-7 w-64" />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border p-5">
                  <Skeleton className="mb-4 h-5 w-5" />
                  <Skeleton className="mb-2 h-4 w-24" />
                  <Skeleton className="h-8 w-28" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
