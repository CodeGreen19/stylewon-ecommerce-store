"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export function ProductsHeader() {
  return (
    <Card className="p-0 md:ring-0 bg-background">
      <CardHeader className="p-4 md:p-0">
        <CardTitle className="text-2xl font-bold truncate">
          View Products
        </CardTitle>
        <CardDescription>
          View products here and mutate certain actions.
        </CardDescription>
        <CardAction>
          <Button
            nativeButton={false}
            render={<Link href={"/store/products/add-new"} />}
          >
            Add New <Plus />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
