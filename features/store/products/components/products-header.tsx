"use client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import Link from "next/link";

export function ProductsHeader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardAction>
          <Field orientation={"horizontal"}>
            <Button
              nativeButton={false}
              render={<Link href={"/store/products/add-new"} />}
            >
              Add Product
            </Button>
          </Field>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
