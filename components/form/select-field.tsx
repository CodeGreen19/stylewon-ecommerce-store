"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFieldContext } from "./use-app-form";

type SelectFieldProps = {
  label?: string;
  placeholder?: string;
  description?: string;
  items: string[];
  onValueChange?: (v: string) => void;
  value?: string;
};

export function SelectField({
  label,
  placeholder,
  description,
  items,
  onValueChange,
  value,
}: SelectFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

      <Select
        value={value || field.state.value}
        onValueChange={(v) => {
          field.handleChange(v as string);
          onValueChange && onValueChange(v as string);
        }}
      >
        <SelectTrigger id={field.name} aria-invalid={isInvalid}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {description && <FieldDescription>{description}</FieldDescription>}

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
