"use client";

import { withForm } from "@/components/form/use-app-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@tanstack/react-form";
import { productDefaultValues } from "../../schemas/product.schema";
export const Inventory = withForm({
  defaultValues: productDefaultValues,

  render: function Render({ form }) {
    const trackInventory = useStore(
      form.store,
      (state) => state.values.trackInventory,
    );

    return (
      <Card>
        <CardHeader>
          <CardTitle>Inventory & Shipping</CardTitle>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            <Field>
              <FieldTitle>
                <Switch
                  checked={trackInventory}
                  onCheckedChange={(v) => {
                    form.setFieldValue("trackInventory", v);
                    form.setFieldValue("productVariants[0].stock", 0);
                  }}
                />
                <span>Track Inventory</span>
              </FieldTitle>
              <FieldDescription>
                Consider tracking you product if you have fixed item.
              </FieldDescription>
            </Field>
            {trackInventory ? (
              <form.AppField
                name="productVariants[0].stock"
                children={(field) => (
                  <field.NumberField
                    label="Inventory"
                    placeHolder="eg. 120"
                    description="Available stock quantity."
                  />
                )}
              />
            ) : (
              <form.AppField
                name="productVariants[0].stock"
                children={(field) => (
                  <field.SelectField
                    label="Inventory"
                    description="Available stock status."
                    onValueChange={(v) => {
                      if (v === "In stock") {
                        form.setFieldValue("productVariants[0].stock", 1);
                      } else {
                        form.setFieldValue("productVariants[0].stock", 0);
                      }
                    }}
                    items={["In stock", "Out of stock"]}
                    value={
                      field.state.value === 0 ? "Out of stock" : "In stock"
                    }
                  />
                )}
              />
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <form.AppField
                name="productVariants[0].sku"
                children={(field) => (
                  <field.TextField
                    label="SKU"
                    placeHolder="eg. SHIRT-BLK-XL"
                    description="Unique product identifier."
                  />
                )}
              />
              <form.AppField
                name="productVariants[0].shippingWeight"
                children={(field) => (
                  <field.NumberField
                    label="Shipping Weight (g)"
                    placeHolder="eg. 450"
                    description="Weight in grams."
                  />
                )}
              />
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
    );
  },
});
