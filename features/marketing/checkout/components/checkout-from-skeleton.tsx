import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutPageSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_500px] pt-6">
      {/* Left Form Section */}
      <div className="border bg-background p-6 md:p-10">
        <Skeleton className="mb-10 h-8 w-64" />

        <div className="grid gap-10 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-5">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-6 w-full" />
            </div>
          ))}
        </div>

        {/* Large address field */}
        <div className="mt-10 space-y-5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Right Summary Section */}
      <div className="border bg-background p-6 md:p-10">
        {/* Title */}
        <Skeleton className="mb-10 h-8 w-64" />

        {/* Shipping Method */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="size-5 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>

            <Skeleton className="h-5 w-20" />
          </div>

          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="border-t pt-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-10">
          <Skeleton className="mb-8 h-8 w-56" />

          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="h-5 w-48" />
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <Skeleton className="mt-14 h-12 w-full rounded-none" />
      </div>
    </div>
  );
}
