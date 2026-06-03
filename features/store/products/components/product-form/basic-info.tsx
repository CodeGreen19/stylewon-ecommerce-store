"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldTitle,
} from "@/components/ui/field";

import { withForm } from "@/components/form/use-app-form";
import { Suspense } from "react";

import { productDefaultValues } from "../../schemas/product.schema";
import { RichTextEditor } from "./rich-text-editor";
export const BasicInfo = withForm({
  defaultValues: productDefaultValues,
  render: function Render({ form }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Basic info</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <form.AppField
              name="name"
              children={(field) => (
                <field.TextField
                  label="Product Name"
                  placeHolder="eg. black shirt with premium look"
                />
              )}
            />
            <form.AppField
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldTitle>Description</FieldTitle>
                    <FieldContent>
                      <Suspense>
                        <RichTextEditor
                          value={field.state.value}
                          onChange={field.handleChange}
                        />
                      </Suspense>
                    </FieldContent>
                    <FieldDescription>
                      Describe your product as much as you can.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </CardContent>
      </Card>
    );
  },
});
