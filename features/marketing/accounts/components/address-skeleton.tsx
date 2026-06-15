import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AddressSkeleton() {
  return (
    <Card className="rounded-none">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>

          <Skeleton className="h-10 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}
