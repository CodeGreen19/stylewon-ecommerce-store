import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const orders = [
  {
    id: "#ORD-1001",
    total: "$120",
    status: "Delivered",
  },
  {
    id: "#ORD-1002",
    total: "$75",
    status: "Processing",
  },
];

export function AccountOrdersPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>

        <p className="text-muted-foreground text-sm">
          Track and manage your recent orders.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
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
