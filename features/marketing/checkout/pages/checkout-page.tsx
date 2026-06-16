import { Suspense } from "react";
import { CheckoutForm } from "../components/checkout-form";
import { getCheckoutInfo } from "../server/checkout.query";
import { CheckoutPageSkeleton } from "../components/checkout-from-skeleton";
import { CheckoutSchemaType } from "../schema/checkout.schema";

export function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutPageSkeleton />}>
      <ShowCheckout />
    </Suspense>
  );
}

async function ShowCheckout() {
  const data = await getCheckoutInfo();
  const existedValues: CheckoutSchemaType | undefined = data.address
    ? {
        ...data.address,
        shippingFees: 0,
        paymentMethod: "Cash on delivery",
        postalCode: data.address.postalCode ?? "",
      }
    : undefined;
  return (
    <CheckoutForm existedValues={existedValues} totalMRP={data.totalMRP} />
  );
}
