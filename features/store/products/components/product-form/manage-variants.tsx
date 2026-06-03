"use client";

import { useAppForm, withForm } from "@/components/form/use-app-form";
import { useState } from "react";
import {
  productDefaultValues,
  productVariantSchema,
  ProductVariantType,
} from "../../schemas/product.schema";

import {
  Banknote,
  Boxes,
  Minus,
  Package,
  Plus,
  TrashIcon,
  Weight,
} from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "@tanstack/react-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Edit } from "lucide-react";
import z from "zod";
import { useVariantSummary } from "../../hooks/use-variant-summary";
import { cn } from "@/lib/utils";

export const ManageVariants = withForm({
  defaultValues: productDefaultValues,
  render: function Render({ form }) {
    const [openDialog, setOpenDialog] = useState(false);
    const variants = useStore(
      form.store,
      (state) => state.values.productVariants,
    );
    const manageOnOptions = useStore(
      form.store,
      (state) => state.values.manageOnOptions,
    );
    const basePrice =
      useStore(form.store, (state) => state.values.basePrice) || 0;
    const trackInventory = useStore(
      form.store,
      (state) => state.values.trackInventory,
    );
    if (!manageOnOptions) return null;
    return (
      <Card>
        <CardHeader>
          <CardTitle variant="form">Variants</CardTitle>
          <CardDescription>Product Variants is listed here</CardDescription>
          <CardAction>
            <ProductVariantsDialog
              open={openDialog}
              setOpen={setOpenDialog}
              form={form}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <VariantSummaryGrid
            trackInventory={trackInventory}
            basePrice={basePrice}
            variants={variants}
          />
        </CardContent>
      </Card>
    );
  },
});

function VariantSummaryGrid({
  variants,
  basePrice,
  trackInventory,
}: {
  variants: ProductVariantType[];
  basePrice: number;
  trackInventory: boolean;
}) {
  const summary = useVariantSummary(variants, basePrice, trackInventory);

  const items = [
    {
      title: "Total Variants",
      value: summary.totalVariants,
      icon: Package,
    },
    {
      title: "Average Price",
      value: `${summary.averagePrice.toFixed(2)} TK`,
      icon: Banknote,
    },
    {
      title: "Inventory Stock",
      value: summary.totalInventoryStock,
      icon: Boxes,
    },
    {
      title: "Avg Shipping Weight",
      value: `${summary.averageShippingWeight.toFixed(2)} gm`,
      icon: Weight,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} className="border-border/50 rounded-2xl">
            <CardHeader>
              <CardTitle>
                <div className="bg-muted flex size-11 items-center justify-center rounded-xl">
                  <Icon className="text-muted-foreground size-5" />
                </div>
              </CardTitle>
              <CardDescription>{item.title}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-tight">
                {item.value}
              </h3>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

type PropTypes = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const ProductVariantsDialog = withForm({
  defaultValues: productDefaultValues,
  props: {
    open: false,
    setOpen: () => {},
  } as PropTypes,
  render: function Render({ form: mainForm, open, setOpen }) {
    const variants = useStore(
      mainForm.store,
      (state) => state.values.productVariants,
    );
    const trackInventory = useStore(
      mainForm.store,
      (state) => state.values.trackInventory,
    );

    const form = useAppForm({
      defaultValues: { variants },
      validators: {
        onSubmit: z.object({ variants: z.array(productVariantSchema) }),
      },
      onSubmit: ({ value }) => {
        console.log("sfasd", value);
        mainForm.setFieldValue("productVariants", value.variants);
        setOpen(false);
      },
    });

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button>
              Edit <Edit />
            </Button>
          }
        />
        <DialogContent className={"p-0 w-full md:min-w-[85vw]"}>
          <DialogHeader className="flex flex-row gap-3 px-4 pt-6">
            <div className="flex-1 space-y-2">
              <DialogTitle>Manage variants</DialogTitle>
              <DialogDescription>
                switch on if you want to track inventory.
              </DialogDescription>
            </div>
            <div className="self-end flex items-center gap-1">
              <Switch
                checked={trackInventory}
                onCheckedChange={(v) =>
                  mainForm.setFieldValue("trackInventory", v)
                }
              />
              Track Inventory
            </div>
          </DialogHeader>
          <form
            id="product-variant-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.AppField mode="array" name="variants">
                {(field) => (
                  <div className="max-h-[60vh] overflow-y-auto md:p-4  space-y-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {field.state.value.map((variant, index) => (
                      <div
                        key={index}
                        className="border p-4  rounded-sm space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant={"secondary"}>{variant.label}</Badge>
                          <form.AppField
                            name={`variants[${index}].active`}
                            children={(field) =>
                              field.state.value === true ? (
                                <Button
                                  onClick={() => {
                                    field.handleChange(false);
                                  }}
                                  variant={"secondary"}
                                  size={"icon-sm"}
                                >
                                  <Minus />
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    field.handleChange(true);
                                  }}
                                  variant={"secondary"}
                                  size={"icon-sm"}
                                >
                                  <Plus />
                                </Button>
                              )
                            }
                          />
                        </div>

                        <form.Subscribe
                          selector={(selector) =>
                            selector.values.variants[index].active
                          }
                          children={(active) => (
                            <div
                              className={cn(
                                "grid grid-cols-[120px_1fr] gap-3 ",
                                !active && "h-0 overflow-hidden",
                              )}
                            >
                              <div className="grid grid-cols-1 place-content-center grid-rows-6 *:h-9 gap-2 *:flex *:items-center *:truncate">
                                <div>Variant Price</div>

                                <div>Price Diff</div>
                                <div>Cost of goods</div>
                                <div>Stock</div>
                                <div>Shipping weights</div>
                                <div>SKU</div>
                              </div>
                              <div className="grid grid-cols-1 grid-rows-6 gap-2">
                                <form.Subscribe
                                  selector={() => {
                                    const basePrice =
                                      mainForm.getFieldValue("basePrice") || 0;
                                    const priceDiff =
                                      form.getFieldValue(
                                        `variants[${index}].priceDiff`,
                                      ) || 0;

                                    const discount =
                                      mainForm.getFieldValue(
                                        "discountInPercent",
                                      ) || 0;

                                    // Calculates the discounted price
                                    return (
                                      (basePrice + priceDiff) *
                                      (1 - discount / 100)
                                    );
                                  }}
                                  children={(field) => (
                                    <div className="pl-3 flex items-center">
                                      {field}
                                    </div>
                                  )}
                                />

                                <form.AppField
                                  name={`variants[${index}].priceDiff`}
                                  children={(field) => (
                                    <field.NumberField placeHolder="0" />
                                  )}
                                />
                                <form.AppField
                                  name={`variants[${index}].costOfGoods`}
                                  children={(field) => (
                                    <field.NumberField
                                      label=""
                                      placeHolder="0"
                                    />
                                  )}
                                />
                                {trackInventory ? (
                                  <form.AppField
                                    name={`variants[${index}].stock`}
                                    children={(field) => (
                                      <field.NumberField placeHolder="eg: 100" />
                                    )}
                                  />
                                ) : (
                                  <form.AppField
                                    name={`variants[${index}].stock`}
                                    children={(field) => (
                                      <field.SelectField
                                        onValueChange={(v) => {
                                          if (v === "In stock") {
                                            form.setFieldValue(
                                              `variants[${index}].stock`,
                                              1,
                                            );
                                          } else {
                                            form.setFieldValue(
                                              `variants[${index}].stock`,
                                              0,
                                            );
                                          }
                                        }}
                                        items={["In stock", "Out of stock"]}
                                        value={
                                          field.state.value === 0
                                            ? "Out of stock"
                                            : "In stock"
                                        }
                                      />
                                    )}
                                  />
                                )}

                                <form.AppField
                                  name={`variants[${index}].shippingWeight`}
                                  children={(field) => (
                                    <field.NumberField placeHolder="0" />
                                  )}
                                />
                                <form.AppField
                                  name={`variants[${index}].sku`}
                                  children={(field) => (
                                    <field.TextField placeHolder="eg: sku-pro" />
                                  )}
                                />
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </form.AppField>
            </FieldGroup>
          </form>
          <DialogFooter className="px-6 pb-4">
            <Field orientation={"horizontal"} className="justify-end">
              <Button variant={"secondary"}>Cancel</Button>
              <form.AppForm>
                <form.SubscribeButton
                  formId="product-variant-form"
                  label="Save"
                />
              </form.AppForm>
            </Field>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
});
