import { AccountLayout } from "@/features/marketing/account/layout/account-layout";
import React from "react";

export default function layout(props: LayoutProps<"/account">) {
  return <AccountLayout {...props} />;
}
