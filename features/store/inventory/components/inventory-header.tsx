"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function InventoryHeader() {
  return (
    <Card className="p-4 md:p-0 shadow-none md:ring-0">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold">View Inventory</CardTitle>
        <CardDescription>
          View inventory here and mutate certain actions.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
