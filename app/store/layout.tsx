import { StoreLayout } from "@/features/store/layout";
import { ThemeProvider } from "@/lib/theme-provider";

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
