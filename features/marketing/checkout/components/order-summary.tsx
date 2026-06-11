import { withForm } from "@/components/form/use-app-form";
import { orderDefaultValue } from "../schema/order.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";

export const OrderSummary = withForm({
  defaultValues: orderDefaultValue,
  render: function Render({ form }) {
    const subtotal = useStore(form.store, (state) => state.values.shippingFee);
    const shippingFee = useStore(form.store, (state) => state.values.subtotal);
    const paymentType = useStore(
      form.store,
      (state) => state.values.paymentType,
    );
    return (
      <Card className="self-start">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>summary description.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>Subtotal : {subtotal}</div>
          <div>Shipping Fee : {shippingFee}</div>
          <div>Payment type : {paymentType}</div>
          <div className="text-xl">Total : {subtotal + shippingFee}</div>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="order-form">
            Checkout
          </Button>
        </CardFooter>
      </Card>
    );
  },
});
