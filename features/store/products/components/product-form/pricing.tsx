"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldTitle,
} from "@/components/ui/field";
import { useStore } from "@tanstack/react-form";

import { withForm } from "@/components/form/use-app-form";
import { Switch } from "@/components/ui/switch";
import { productDefaultValues } from "../../schemas/product.schema";

export const Pricing = withForm({
  defaultValues: productDefaultValues,

  render: function Render({ form }) {
    const basePrice = useStore(form.store, (s) => s.values.basePrice);
    const costOfGood = useStore(
      form.store,
      (s) => s.values.productVariants[0].costOfGoods,
    );
    const discountInPercent = useStore(
      form.store,
      (s) => s.values.discountInPercent,
    );
    const isOnSale = useStore(form.store, (s) => s.values.onSale);
    const manageOnOptions = useStore(
      form.store,
      (s) => s.values.manageOnOptions,
    );

    const safeBasePrice = Number(basePrice) || 0;
    const safeCost = Number(costOfGood) || 0;
    const safeDiscount = Number(discountInPercent) || 0;
    const discountAmount = isOnSale ? (safeBasePrice * safeDiscount) / 100 : 0;

    const sellingPrice = Math.max(safeBasePrice - discountAmount, 0);

    const profit = sellingPrice - safeCost;

    const margin =
      sellingPrice > 0 ? ((profit / sellingPrice) * 100).toFixed(2) : "0";

    function handleSaleToggle(checked: boolean) {
      form.setFieldValue("onSale", checked);
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            {/* Base Pricing */}
            <div className="grid gap-4 md:grid-cols-2">
              <form.AppField
                name="basePrice"
                children={(field) => (
                  <field.NumberField
                    label="Price"
                    placeHolder="eg. 1200"
                    description="Original product selling price."
                  />
                )}
              />

              {!manageOnOptions && (
                <form.AppField
                  name="productVariants[0].costOfGoods"
                  children={(field) => (
                    <field.NumberField
                      label="Cost of Goods"
                      placeHolder="eg. 800"
                      description="Your actual sourcing/manufacturing cost."
                    />
                  )}
                />
              )}
            </div>
            <Field>
              <FieldTitle>
                <Switch checked={isOnSale} onCheckedChange={handleSaleToggle} />

                <span>On Sale</span>
              </FieldTitle>

              <FieldDescription>
                Enable discount pricing for this product.
              </FieldDescription>
            </Field>

            {isOnSale && (
              <div className="grid gap-4 md:grid-cols-2">
                <form.AppField
                  name="discountInPercent"
                  children={(field) => (
                    <field.NumberField
                      label="Discount Percentage"
                      placeHolder="eg. 15"
                      description="Discount percentage customers will receive."
                    />
                  )}
                />
              </div>
            )}

            {/* Pricing Summary */}
            {!manageOnOptions && (
              <div className="flex flex-col gap-4 md:flex-row">
                {isOnSale && (
                  <div className=" border bg-muted p-4 space-y-1 flex-1">
                    <p className="text-sm text-muted-foreground">
                      Selling Price
                    </p>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-semibold">
                        ৳ {sellingPrice.toLocaleString()}
                      </h3>
                      {isOnSale && (
                        <p className="text-sm line-through text-muted-foreground">
                          ৳ {safeBasePrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className=" border bg-muted p-4 space-y-1 flex-1">
                  <p className="text-sm text-muted-foreground">
                    Estimated Profit
                  </p>

                  <h3 className="text-2xl font-semibold">
                    ৳ {profit.toLocaleString()}
                  </h3>
                </div>

                <div className=" border bg-muted p-4 space-y-1 flex-1">
                  <p className="text-sm text-muted-foreground">Profit Margin</p>

                  <h3 className="text-2xl font-semibold">{margin}%</h3>
                </div>
              </div>
            )}
          </FieldGroup>
        </CardContent>
      </Card>
    );
  },
});
