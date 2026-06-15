"use client";

import { Button } from "@/components/ui/button";
import { AuthLayout } from "../components/auth-shared-layout";

import { SignupForm } from "../components/signup-form";

export function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Join the platform and start exploring modern experiences."
      bottomText="Already have an account?"
      bottomLinkText="Sign in"
      bottomLinkHref="/signin"
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

          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-4">Or continue with</span>
          </div>
        </div>

        <SignupForm />
      </div>
    </AuthLayout>
  );
}
