import { Skeleton } from "@/components/ui/skeleton";

export function CartSheetSkeleton() {
  return (
    <div className="space-y-4 px-4 md:px-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-3 border-b py-4">
          <Skeleton className="size-20 rounded-md" />

          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-4/5" />

            <Skeleton className="h-3 w-20" />

            <Skeleton className="h-4 w-16" />

            <div className="flex justify-between">
              <Skeleton className="h-9 w-32" />

              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
