"use client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Trash } from "lucide-react";

import { withForm } from "@/components/form/use-app-form";
import { useRouter } from "next/navigation";
import { productDefaultValues } from "../../schemas/product.schema";

export const Footer = withForm({
  defaultValues: productDefaultValues,
  props: { type: "CREATE" as "CREATE" | "UPDATE" },

  render: function Render({ form, type }) {
    const router = useRouter();

    const submitLabel = type === "CREATE" ? "Submit" : "Update";

    return (
      <Card className="p-0 shadow-none md:ring-0 border-none bg-background">
        <CardHeader className=" p-4 md:p-0">
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
              <form.SubscribeButton label={submitLabel} />
            </Field>
          </CardAction>
        </CardHeader>
      </Card>
    );
  },
});
