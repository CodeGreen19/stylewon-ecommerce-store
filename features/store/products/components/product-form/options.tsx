"use client";

import { Palette, Pencil, Plus, Trash2, Type } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

import { useAppForm, withForm } from "@/components/form/use-app-form";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useStore } from "@tanstack/react-form";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { generateVariants } from "../../helpers/generate-variants";
import {
  defaultProductVariant,
  productDefaultValues,
  productOptionSchema,
  ProductOptionType,
} from "../../schemas/product.schema";

export const Options = withForm({
  defaultValues: productDefaultValues,

  render: function Render({ form }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [editOption, setEditOption] = useState<ProductOptionType | null>(
      null,
    );
    const options = useStore(
      form.store,
      (state) => state.values.productOptions,
    );
    const manageOnOptions = useStore(
      form.store,
      (state) => state.values.manageOnOptions,
    );

    return (
      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>
            Does your product come in different options, like size, color or
            material? Add them here
          </CardDescription>
          <CardAction>
            <ProductOptionDialog
              open={openDialog}
              setOpen={setOpenDialog}
              form={form}
              editOption={editOption}
              resetEditOption={() => setEditOption(null)}
            />
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          {options.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No options added yet !
            </div>
          ) : (
            options.map((option, optionIndex) => (
              <div
                key={`${option.name}-${optionIndex}`}
                className="rounded-md border shadow-xs bg-input/30 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{option.name}</h4>

                      <Badge
                        variant="secondary"
                        className="capitalize rounded-md"
                      >
                        {option.type}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {option.values.length} values
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 rounded-lg"
                      onClick={() => {
                        setEditOption(option);
                        setOpenDialog(true);
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 rounded-lg text-destructive hover:text-destructive"
                      onClick={() => {
                        form.setFieldValue(
                          "productOptions",
                          options.filter((_, i) => i !== optionIndex),
                        );
                        if (manageOnOptions) {
                          form.setFieldValue("manageOnOptions", false);
                          form.setFieldValue("productVariants", [
                            defaultProductVariant,
                          ]);
                        }
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {option.values.map((value, valueIndex) => (
                    <Badge
                      key={`${value.label}-${valueIndex}`}
                      variant="outline"
                      className="flex items-center gap-2 rounded-lg px-3 py-1.5"
                    >
                      {value.color && (
                        <ColorPickerPopover
                          color={value.color}
                          onChangeColor={(newColor) => {
                            const newValues = option.values.map((v, index) => {
                              if (index === valueIndex) {
                                return { label: v.label, color: newColor };
                              } else {
                                return v;
                              }
                            });
                            const options = form
                              .getFieldValue("productOptions")
                              .map((item, index) => {
                                if (index === optionIndex) {
                                  return { ...item, values: newValues };
                                } else {
                                  return item;
                                }
                              });
                            form.setFieldValue("productOptions", options);
                          }}
                        />
                      )}

                      <span>{value.label}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          )}

          {options.length > 0 && (
            <Field>
              <FieldTitle>
                <Switch
                  checked={manageOnOptions}
                  onCheckedChange={(v) => {
                    form.setFieldValue("manageOnOptions", v);
                    if (v === true) {
                      const variants = generateVariants(options);

                      form.setFieldValue("productVariants", variants);
                    } else {
                      form.setFieldValue("productVariants", [
                        defaultProductVariant,
                      ]);
                    }
                  }}
                />
                Manage
              </FieldTitle>
              <FieldDescription>
                Manage pricing and inventory for each product variant
              </FieldDescription>
            </Field>
          )}
        </CardContent>
      </Card>
    );
  },
});

function ColorPickerPopover({
  color,
  onChangeColor,
}: {
  color: string;
  onChangeColor: (newColor: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <span
          className="size-3 inline-block rounded-full border shrink-0"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className={"w-fit"}>
        <HexColorPicker
          defaultValue={color}
          onChange={(v) => {
            onChangeColor(v);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

type PropTypes = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editOption: ProductOptionType | null;
  resetEditOption: () => void;
};
const ProductOptionDialog = withForm({
  defaultValues: productDefaultValues,
  props: {
    open: false,
    setOpen: () => {},
    editOption: { name: "", type: "text", values: [] },
    resetEditOption: () => {},
  } as PropTypes,
  render: function Render({
    form: mainForm,
    editOption,
    open,
    setOpen,
    resetEditOption,
  }) {
    const defaultValues: ProductOptionType = editOption ?? {
      name: "",
      type: "text",
      values: [],
    };
    const manageOnOptions = useStore(
      mainForm.store,
      (state) => state.values.manageOnOptions,
    );

    function disableVariantManagement() {
      mainForm.setFieldValue("manageOnOptions", false);
      mainForm.setFieldValue("productVariants", [defaultProductVariant]);
    }

    function regenerateVariants(options: ProductOptionType[]) {
      const existingVariants = mainForm.getFieldValue("productVariants");

      const generatedVariants = generateVariants(options);

      const mergedVariants = generatedVariants.map((variant) => {
        const existing = existingVariants.find(
          (v) => v.label === variant.label,
        );

        return existing ?? variant;
      });
      mainForm.setFieldValue("productVariants", mergedVariants);
    }

    const form = useAppForm({
      defaultValues,
      validators: { onSubmit: productOptionSchema },
      onSubmit: async ({ value: option }) => {
        const options = mainForm.getFieldValue("productOptions");

        let newOptions: ProductOptionType[];

        if (!editOption) {
          newOptions = [...options, option];
        } else {
          const editIndex = options.findIndex(
            (o) => o.name.toLowerCase() === editOption.name.toLowerCase(),
          );

          newOptions = options.map((o, index) =>
            index === editIndex ? option : o,
          );
        }

        mainForm.setFieldValue("productOptions", newOptions);

        if (!editOption) {
          if (manageOnOptions) {
            disableVariantManagement();
          }
        } else {
          if (manageOnOptions) {
            regenerateVariants(newOptions);
          }
        }

        setOpen(false);
        resetEditOption();
        form.reset();
      },
    });

    const type = useStore(form.store, (state) => state.values.type);

    return (
      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) {
            setOpen(v);
            resetEditOption();
            form.reset();
          } else {
            setOpen(v);
          }
        }}
      >
        <DialogTrigger
          render={
            <Button variant={"secondary"}>
              Add Options <Plus />
            </Button>
          }
        />
        <DialogContent>
          <form
            id="product-option-form"
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <DialogHeader>
              <DialogTitle>Product Options</DialogTitle>
              <DialogDescription>Product options descrptions</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <form.AppField
                name="name"
                children={(field) => (
                  <field.TextField
                    label="Name"
                    placeHolder="Enter a option name"
                  />
                )}
              />
              <form.AppField
                name="type"
                listeners={{
                  onChange: () => {
                    form.setFieldValue("values", []);
                  },
                }}
                children={(field) => (
                  <OptionTypeField
                    value={field.state.value}
                    onChange={field.handleChange}
                  />
                )}
              />
              <form.AppField
                name="values"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Values</FieldLabel>
                      <MultiSelectInput
                        type={type}
                        values={field.state.value}
                        onChange={field.handleChange}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
            <DialogFooter>
              <Field orientation={"horizontal"} className="justify-end">
                <Button
                  onClick={() => {
                    setOpen(false);
                    resetEditOption();
                    form.reset();
                  }}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <form.AppForm>
                  <form.SubscribeButton
                    label="Save"
                    formId="product-option-form"
                  />
                </form.AppForm>
              </Field>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  },
});

type OptionType = "text" | "color";

function OptionTypeField({
  value,
  onChange,
}: {
  value: OptionType;
  onChange: (value: OptionType) => void;
}) {
  return (
    <Field orientation="horizontal" className="gap-2">
      <Button
        type="button"
        variant="ghost"
        onClick={() => onChange("text")}
        className={cn(
          "flex-1 border",
          value === "text" &&
            "border-primary bg-primary/10 text-primary hover:bg-primary/10",
        )}
      >
        <Type className="size-4" />
        Text
      </Button>

      <Button
        type="button"
        variant="ghost"
        onClick={() => onChange("color")}
        className={cn(
          "flex-1 border",
          value === "color" &&
            "border-primary bg-primary/10 text-primary hover:bg-primary/10",
        )}
      >
        <Palette className="size-4" />
        Color
      </Button>
    </Field>
  );
}

type ProductOptionValue = ProductOptionType["values"][number];
type MultiSelectInputProps = {
  type: OptionType;
  values: ProductOptionValue[];
  onChange: (v: ProductOptionValue[]) => void;
};

function getSuggestions(type: OptionType): ProductOptionValue[] {
  if (type === "text") {
    return [
      { label: "XS" },
      { label: "Small" },
      { label: "Medium" },
      { label: "Large" },
      { label: "XL" },
      { label: "XXL" },
    ];
  }

  return [
    { label: "Red", color: "#ef4444" },
    { label: "Blue", color: "#3b82f6" },
    { label: "Green", color: "#22c55e" },
    { label: "Black", color: "#000000" },
    { label: "White", color: "#ffffff" },
  ];
}
function MultiSelectInput({ onChange, type, values }: MultiSelectInputProps) {
  const anchor = useComboboxAnchor();
  const [inputValue, setInputValue] = useState("");
  const suggestions = getSuggestions(type);

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    event.stopPropagation();
    if (event.key !== "Enter") return;
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const exists = values.some(
      (item) => item.label.trim().toLowerCase() === trimmed.toLowerCase(),
    );
    console.log("entered", trimmed, exists);

    if (!exists) {
      onChange([
        ...values,
        {
          label: trimmed,
          color: type === "color" ? "#000000" : undefined,
        },
      ]);
    }

    setInputValue("");
  }

  return (
    <Combobox
      multiple
      autoHighlight
      items={suggestions}
      value={values}
      defaultValue={values}
      onValueChange={(newValues) => {
        const uniqueValues = newValues.filter(
          (value, index, arr) =>
            arr.findIndex(
              (v) =>
                v.label.trim().toLowerCase() ===
                value.label.trim().toLowerCase(),
            ) === index,
        );

        onChange(uniqueValues);
      }}
    >
      <ComboboxChips ref={anchor} className="w-full">
        <ComboboxValue>
          {(values) => (
            <>
              {values.map((value: ProductOptionValue) => (
                <ComboboxChip key={value.label}>{value.label}</ComboboxChip>
              ))}

              <ComboboxChipsInput
                value={inputValue}
                placeholder={inputValue.length > 0 ? "" : "e.g. Large"}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>

      <ComboboxContent anchor={anchor} className="rounded-sm">
        <ComboboxEmpty>No items found.</ComboboxEmpty>

        <ComboboxList>
          {(item: ProductOptionValue) => (
            <ComboboxItem key={item.label} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
