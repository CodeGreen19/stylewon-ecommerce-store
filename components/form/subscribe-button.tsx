"use client";
import { SquareArrowRightEnter } from "lucide-react";
import { Button } from "../ui/button";
import { useFormContext } from "./use-app-form";

export function SubscribeButton({
  label = "Submit",
  formId,
}: {
  label?: string;
  formId?: string;
}) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button form={formId} type="submit" disabled={isSubmitting}>
          {label} <SquareArrowRightEnter />
        </Button>
      )}
    </form.Subscribe>
  );
}
