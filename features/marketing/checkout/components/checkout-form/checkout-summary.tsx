import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface ShippingMethod {
  id: string;
  label: string;
  price: number;
}

interface PaymentMethod {
  id: string;
  label: string;
}

interface CheckoutSummaryProps {
  shippingMethods?: ShippingMethod[];
  paymentMethods?: PaymentMethod[];
  totalMrp?: number;
  currencySymbol?: string;
  onShippingChange?: (value: string) => void;
  onPaymentChange?: (value: string) => void;
}

// Default values matching your screenshot
const defaultShipping: ShippingMethod[] = [
  { id: "free", label: "Free Shipping", price: 0.0 },
];

const defaultPayment: PaymentMethod[] = [
  { id: "cod", label: "Cash on delivery" },
  { id: "bkash", label: "Bkash" },
  { id: "card-wallet", label: "Pay with Card/Mobile Wallet" },
];

export function CheckoutSummary({
  shippingMethods = defaultShipping,
  paymentMethods = defaultPayment,
  totalMrp = 2256.0,
  currencySymbol = "৳",
  onShippingChange,
  onPaymentChange,
}: CheckoutSummaryProps) {
  // Assuming the first item is selected by default for this example
  const [selectedShipping, setSelectedShipping] = React.useState(
    shippingMethods[0]?.id,
  );
  const [selectedPayment, setSelectedPayment] = React.useState(
    paymentMethods[0]?.id,
  );

  const currentShippingPrice =
    shippingMethods.find((m) => m.id === selectedShipping)?.price || 0;
  const totalAmount = totalMrp + currentShippingPrice;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle> Choose Shipping Method</CardTitle>
      </CardHeader>
      <CardContent className=" space-y-6">
        <div>
          <RadioGroup
            value={selectedShipping}
            onValueChange={(val) => {
              setSelectedShipping(val);
              onShippingChange?.(val);
            }}
            className="space-y-2"
          >
            {shippingMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between space-x-2"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={method.id}
                    id={`shipping-${method.id}`}
                  />
                  <Label
                    htmlFor={`shipping-${method.id}`}
                    className="text-base font-normal cursor-pointer"
                  >
                    {method.label}
                  </Label>
                </div>
                <span className="text-base font-normal">
                  {currencySymbol}
                  {method.price.toFixed(2)}
                </span>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-base">
            <span className="font-normal">Total MRP</span>
            <span className="font-normal">
              {currencySymbol}
              {totalMrp.toFixed(2)}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center text-lg font-medium">
            <span>Total Amount</span>
            <span className=" font-semibold text-xl">
              {currencySymbol}
              {totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium tracking-tight uppercase">
            Choose Payment Method
          </h3>
          <RadioGroup
            value={selectedPayment}
            onValueChange={(val) => {
              setSelectedPayment(val);
              onPaymentChange?.(val);
            }}
            className="space-y-3"
          >
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-3">
                <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                <Label
                  htmlFor={`payment-${method.id}`}
                  className="text-base font-normal cursor-pointer"
                >
                  {method.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
