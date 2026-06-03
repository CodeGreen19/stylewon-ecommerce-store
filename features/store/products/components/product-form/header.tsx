"use client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Trash } from "lucide-react";

import { withForm } from "@/components/form/use-app-form";
import { useRouter } from "next/navigation";
import { productDefaultValues } from "../../schemas/product.schema";

export const Header = withForm({
  defaultValues: productDefaultValues,
  props: { title: "" },
  render: function Render({ form, title }) {
    const router = useRouter();
    return (
      <Card>
        <CardHeader>
          <CardTitle variant="form">{title}</CardTitle>
          <CardAction>
            <Field orientation={"horizontal"}>
              <Button
                variant={"destructive"}
                onClick={() => {
                  form.reset();
                  router.push("/store/products");
                }}
              >
                Discard <Trash />
              </Button>
              <form.SubscribeButton />
            </Field>
          </CardAction>
        </CardHeader>
      </Card>
    );
  },
});
