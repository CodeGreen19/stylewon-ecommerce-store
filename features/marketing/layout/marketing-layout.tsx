import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function MarketingLayout(props: LayoutProps<"/">) {
  return (
    <div>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
}
