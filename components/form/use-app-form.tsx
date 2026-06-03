import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "./text-field";
import { NumberField } from "./number-field";
import { TextareaField } from "./textarea-field";
import { SubscribeButton } from "./subscribe-button";
import { SelectField } from "./select-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    NumberField,
    TextareaField,
    SelectField,
  },
  formComponents: {
    SubscribeButton,
  },
});
