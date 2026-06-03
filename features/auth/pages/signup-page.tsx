// app/(auth)/sign-up/page.tsx

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "../components/auth-shared-layout";

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
        {/* SOCIAL LOGIN */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-11 ">
            {/* <Chrome className="mr-2 size-4" /> */}
            Google
          </Button>

          <Button variant="outline" className="h-11">
            {/* <Github className="mr-2 size-4" /> */}
            GitHub
          </Button>
        </div>

        {/* DIVIDER */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t " />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="">Or continue with</span>
          </div>
        </div>

        {/* FORM */}
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input id="name" placeholder="John Doe" className="h-12 " />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="h-12 "
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-12 "
            />
          </div>

          <Button className="h-12 w-full rounded-full text-base font-medium">
            Create Account
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
