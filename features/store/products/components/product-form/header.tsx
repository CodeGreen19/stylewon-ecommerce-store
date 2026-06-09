"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Trash } from "lucide-react";

import { withForm } from "@/components/form/use-app-form";
import { useRouter } from "next/navigation";
import { productDefaultValues } from "../../schemas/product.schema";

export const Header = withForm({
  defaultValues: productDefaultValues,
  props: { type: "CREATE" as "CREATE" | "UPDATE" },
  render: function Render({ form, type }) {
    const router = useRouter();

    const title = type === "CREATE" ? "Add new product" : "Update product";
    const description =
      type === "CREATE"
        ? "Add any proudct and it's variants to manage."
        : "Update any products and it's variants to manage.";
    const submitLabel = type === "CREATE" ? "Submit" : "Update";

    return (
      <Card className="p-0 md:ring-0 bg-background">
        <CardHeader className="p-4 md:p-0">
          <CardTitle className="text-2xl font-bold truncate">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardAction>
            <Field orientation={"horizontal"}>
              <Button
                variant={"destructive"}
                onClick={() => {
                  form.reset();
                  router.push("/store/products");
                }}
              >
                <span className="hidden md:inline">Discard</span> <Trash />
              </Button>
              <form.SubscribeButton label={submitLabel} />
            </Field>
          </CardAction>
        </CardHeader>
      </Card>
    );
  },
});
