"use client";

import { useAppForm } from "@/components/form/use-app-form";
import { showToast } from "@/helpers/func-response";
import { orderDefaultValue, orderSchema } from "../schema/order.schema";
import { createOrder } from "../server/order.action";
import { AddressPart } from "./address";
import { OrderSummary } from "./order-summary";
import { useRouter } from "next/navigation";

export function OrderForm({
  defaultValues,
}: {
  defaultValues: typeof orderDefaultValue;
}) {
  const router = useRouter();
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: orderSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await createOrder(value);
      showToast(res);
      router.push("/account/orders");
    },
  });

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold py-6">Shipping And Billing Address</h1>
      <div>
        <form
          id="order-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4  max-w-7xl m-auto">
            <AddressPart form={form} />
            <OrderSummary form={form} />
          </div>
        </form>
      </div>
    </div>
  );
}
