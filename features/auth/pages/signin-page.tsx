"use client";

import { Button } from "@/components/ui/button";
import { AuthLayout } from "../components/auth-shared-layout";

import { SigninForm } from "../components/signin-form";

export function SigninPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to continue accessing your dashboard and resources."
      bottomText="Don’t have an account?"
      bottomLinkText="Create one"
      bottomLinkHref="/signup"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-11 ">
            Google
          </Button>

          <Button variant="outline" className="h-11 ">
            GitHub
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-800" />
          </div>
          <div className="relative flex justify-center text-xs ">
            <span className="bg-white px-4">Or continue with</span>
          </div>
        </div>
        <SigninForm />
      </div>
    </AuthLayout>
  );
}
