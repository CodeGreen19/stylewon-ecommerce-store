import { MarketingLayout } from "@/features/marketing/layout";
import { ThemeProvider } from "@/lib/theme-provider";

export default function layout(props: LayoutProps<"/">) {
  return (
    <ThemeProvider defaultTheme="light" forcedTheme="light">
      <MarketingLayout {...props} />
    </ThemeProvider>
  );
}
