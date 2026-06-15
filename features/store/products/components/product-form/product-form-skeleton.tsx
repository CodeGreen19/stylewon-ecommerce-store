import { Skeleton } from "@/components/ui/skeleton";
import { StorePageHeaderSkeleton } from "@/features/store/shared/components/store-page-header";

export default function ProductFormSkeleton() {
  return (
    <div className="p-4 md:p-6">
      <StorePageHeaderSkeleton />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Images */}
          <div className=" border p-6">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <Skeleton className="h-7 w-40" />
              </div>

              <Skeleton className="h-10 w-36" />
            </div>

            <Skeleton className="h-5 w-48" />
          </div>

          {/* Basic Info */}
          <div className=" border p-6">
            <Skeleton className="mb-8 h-8 w-40" />

            {/* Product Name */}
            <Skeleton className="mb-3 h-4 w-28" />
            <Skeleton className="mb-8 h-10 w-full" />

            {/* Description */}
            <Skeleton className="mb-3 h-4 w-24" />

            {/* Editor Toolbar */}
            <div className="mb-0 flex gap-3 border border-b-0 p-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-5" />
              ))}
            </div>

            {/* Editor */}
            <Skeleton className="h-[260px] w-full rounded-t-none" />

            <Skeleton className="mt-4 h-4 w-64" />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Options */}
          <div className=" border p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <Skeleton className="mb-2 h-7 w-32" />
                <Skeleton className="h-4 w-80 max-w-full" />
              </div>

              <Skeleton className="h-10 w-36" />
            </div>

            <Skeleton className="h-36 w-full" />
          </div>

          {/* Inventory & Shipping */}
          <div className=" border p-6">
            <Skeleton className="mb-8 h-8 w-56" />

            {/* Track Inventory */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-36" />
              </div>

              <Skeleton className="h-4 w-80 max-w-full" />
            </div>

            {/* Inventory */}
            <div className="mb-8">
              <Skeleton className="mb-4 h-5 w-24" />

              <Skeleton className="mb-3 h-10 w-full" />

              <Skeleton className="h-4 w-40" />
            </div>

            {/* SKU + Weight */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Skeleton className="mb-3 h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div>
                <Skeleton className="mb-3 h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Extra fields */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
