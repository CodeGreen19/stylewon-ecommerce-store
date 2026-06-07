"use client";

import { useTransition } from "react";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

import { checkoutSchema, CheckoutType } from "../schema/checkout.schema";

import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { createOrder, getCheckout } from "../server/checkout.action";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

type CheckoutFieldProps = {
  field: any;
  label: string;
  placeholder: string;
};

export function CheckoutField({
  field,
  label,
  placeholder,
}: CheckoutFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        autoComplete="off"
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export function CheckoutPage() {
  const [isSubmitting, startTransition] = useTransition();
  const { isPending, error, data } = useQuery({
    queryKey: ["checkout-data"],
    queryFn: () => getCheckout(),
  });
  const defaultValues: CheckoutType = {
    customerName: data?.address?.recipientName || "",
    customerPhone: data?.address?.phone || "",
    shippingAddress: data?.address?.addressLine1 || "",
    notes: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: checkoutSchema,
    },

    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const res = await createOrder(value);
        toast.message(res.message);
      });
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurrs {error.message}</div>;
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6 p-6"
    >
      <FieldGroup>
        <form.Field name="customerName">
          {(field) => (
            <CheckoutField field={field} label="Name" placeholder="John Doe" />
          )}
        </form.Field>

        <form.Field name="customerPhone">
          {(field) => (
            <CheckoutField
              field={field}
              label="Phone"
              placeholder="017xxxxxxxx"
            />
          )}
        </form.Field>

        <form.Field name="shippingAddress">
          {(field) => (
            <CheckoutField
              field={field}
              label="Shipping Address"
              placeholder="Enter address"
            />
          )}
        </form.Field>

        <form.Field name="notes">
          {(field) => (
            <CheckoutField
              field={field}
              label="Notes"
              placeholder="Optional notes"
            />
          )}
        </form.Field>
      </FieldGroup>

      <div className="text-xl font-semibold">Total : {data.total} &#2547;</div>

      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
      >
        {({ canSubmit }) => (
          <Button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? "Saving..." : "Continue Checkout"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
