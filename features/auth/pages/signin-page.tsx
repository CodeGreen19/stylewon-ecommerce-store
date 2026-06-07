"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "../components/auth-shared-layout";

import { useForm } from "@tanstack/react-form";
import * as React from "react";
import { toast } from "sonner";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
});

export function SigninPage() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await authClient.signIn.email({
        ...value,
        fetchOptions: { onSuccess: () => router.push("/") },
      });
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to continue accessing your dashboard and resources."
      bottomText="Don’t have an account?"
      bottomLinkText="Create one"
      bottomLinkHref="/signup"
    >
      <div className="space-y-6">
        {/* SOCIAL LOGIN */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-11 ">
            {/* <Chrome className="mr-2 size-4" /> */}
            Google
          </Button>

          <Button variant="outline" className="h-11 ">
            {/* <Github className="mr-2 size-4" /> */}
            GitHub
          </Button>
        </div>

        {/* DIVIDER */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-800" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white">Or continue with</span>
          </div>
        </div>

        {/* FORM */}
        <form
          id="signin-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="eg: email@gmail.com"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="*******"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Button
              type="submit"
              form={"signin-form"}
              disabled={isSubmitting}
              className="h-12 w-full rounded-full text-base font-medium"
            >
              Submit
            </Button>
          )}
        />
      </div>
    </AuthLayout>
  );
}
