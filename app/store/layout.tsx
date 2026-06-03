import { StoreLayout } from "@/features/store/layout/store-layout";
import { ThemeProvider } from "@/lib/theme-provider";
import React from "react";

export default function layout(props: LayoutProps<"/store">) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreLayout {...props} />
    </ThemeProvider>
  );
}
