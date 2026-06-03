import { MarketingLayout } from "@/features/marketing/layout/marketing-layout";
import { ThemeProvider } from "@/lib/theme-provider";
import React from "react";

export default function layout(props: LayoutProps<"/">) {
  return (
    <ThemeProvider forcedTheme="light">
      <MarketingLayout {...props} />
    </ThemeProvider>
  );
}
