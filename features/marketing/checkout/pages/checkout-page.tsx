import { Suspense } from "react";
import { OrderForm } from "../components/order-form";
import { getCheckout } from "../server/order.action";
import { orderDefaultValue } from "../schema/order.schema";

export function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <CheckoutInfo />
    </Suspense>
  );
}

async function CheckoutInfo() {
  const res = await getCheckout();
  const defaultValues: typeof orderDefaultValue = {
    customerName: res.address?.recipientName || "",
    customerPhone: res.address?.phone || "",
    paymentType: "Cash on delivery",
    shippingAddress: res.address?.addressLine1 || "",
    shippingFee: res.shippingFee,
    subtotal: res.subtotal,
    notes: "",
  };
  return (
    <div className="max-w-7xl m-auto">
      <OrderForm defaultValues={defaultValues} />
    </div>
  );
}
