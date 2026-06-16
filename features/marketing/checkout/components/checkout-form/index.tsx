"use client";
import { useAppForm } from "@/components/form/use-app-form";
import { Button } from "@/components/ui/button";
import { revalidateLogic } from "@tanstack/react-form";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  checkoutDefaultValues,
  checkoutSchema,
  CheckoutSchemaType,
} from "../../schema/checkout.schema";
import { AddressForm } from "./address-form";
import { CheckoutSummary } from "./checkout-summary";
import { confirmCheckout } from "../../server/checkout.action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function CheckoutForm({
  existedValues,
  totalAmount,
  totalMRP,
}: {
  existedValues?: CheckoutSchemaType;
  totalMRP?: number;
  totalAmount?: number;
}) {
  const defaultValues = existedValues ?? checkoutDefaultValues;
  const router = useRouter();
  const qc = useQueryClient();

  const form = useAppForm({
    defaultValues,
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    validators: {
      onDynamic: checkoutSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await confirmCheckout(value);
      toast.success(res.message);
      router.push("/account/orders");
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <form
      id="checkout-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="grid gap-2 grid-cols-1 md:grid-cols-[2fr_1fr] md:gap-4 pt-6"
    >
      <AddressForm form={form} />
      <div>
        <CheckoutSummary totalMrp={totalMRP} />
        <div className="p-4 md:p-8 bg-white">
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(pending) => (
              <Button
                type="submit"
                className="w-full"
                form="checkout-form"
                disabled={pending}
              >
                Confirm <SendHorizonal />
              </Button>
            )}
          </form.Subscribe>
        </div>
      </div>
    </form>
  );
}
