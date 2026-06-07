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
  props: { title: "", description: "" },
  render: function Render({ form, title, description }) {
    const router = useRouter();
    return (
      <Card className="p-0 shadow-none md:ring-0 bg-background">
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
              <form.SubscribeButton />
            </Field>
          </CardAction>
        </CardHeader>
      </Card>
    );
  },
});
