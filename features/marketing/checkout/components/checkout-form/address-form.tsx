import { withForm } from "@/components/form/use-app-form";
import { checkoutDefaultValues } from "../../schema/checkout.schema";
import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AddressForm = withForm({
  defaultValues: checkoutDefaultValues,
  render: function Render({ form }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipping & Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <form.AppField
              name="fullName"
              children={(field) => (
                <field.TextField
                  label="Full Name"
                  placeHolder="e.g., Ahmed Ali"
                />
              )}
            />
            <form.AppField
              name="phone"
              children={(field) => (
                <field.TextField
                  label="Phone number"
                  placeHolder="e.g., 01712345678"
                />
              )}
            />
            <form.AppField
              name="district"
              children={(field) => (
                <field.TextField
                  label="District"
                  placeHolder="e.g., Chuadanga"
                />
              )}
            />
            <form.AppField
              name="thana"
              children={(field) => (
                <field.TextField label="Thana" placeHolder="e.g., Damurhuda" />
              )}
            />
            <form.AppField
              name="postalCode"
              children={(field) => (
                <field.TextField label="Postal code" placeHolder="e.g., 7220" />
              )}
            />
            <form.AppField
              name="receivingLocation"
              children={(field) => (
                <field.TextareaField
                  label="Receiving Location"
                  placeHolder="e.g., House 15, Road 4, Chuadanga Chourasta"
                />
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>
    );
  },
});
