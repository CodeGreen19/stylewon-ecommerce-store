import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function MarketingLayout(Props: LayoutProps<"/">) {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="min-h-screen px-4 xl:px-0 max-w-7xl m-auto">
        {Props.children}
      </div>
      <Footer />
    </div>
  );
}
