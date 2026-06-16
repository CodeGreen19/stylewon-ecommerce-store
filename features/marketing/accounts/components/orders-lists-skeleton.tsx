import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrdersListsSkeleton() {
  const skeletonOrders = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div>
      {skeletonOrders.map((index) => (
        <Card key={index} className="rounded-none border-muted/60">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-24 rounded-none bg-muted/60" />
                  <Skeleton className="h-5 w-16 rounded-none bg-muted/40" />
                </div>
                <Skeleton className="h-3 w-20 rounded-none bg-muted/50" />
              </div>

              <div className="flex items-center justify-between gap-8 sm:text-right">
                <div className="space-y-1.5 flex flex-col sm:items-end">
                  <Skeleton className="h-3 w-16 rounded-none bg-muted/40" />
                  <Skeleton className="h-5 w-20 rounded-none bg-muted/60" />
                </div>

                <Skeleton className="h-8 w-8 rounded-none bg-muted/50 border border-muted" />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
