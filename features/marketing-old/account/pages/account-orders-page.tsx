"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../server/order.action";

export function AccountOrdersPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });
  if (isPending) {
    return <div>Pending...</div>;
  }
  if (error) {
    return <div> Error occurs</div>;
  }
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>

        <p className="text-muted-foreground text-sm">
          Track and manage your recent orders.
        </p>
      </div>

      <div className="space-y-4">
        {data.orders.length === 0 && <div>No Orders</div>}
        {data.orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">{order.id}</CardTitle>

              <Badge variant="secondary">{order.status}</Badge>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Order Total</p>

                <p className="font-medium">{order.total}</p>
              </div>

              <button className="text-sm font-medium underline underline-offset-4">
                View Details
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
