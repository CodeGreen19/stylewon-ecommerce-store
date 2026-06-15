import { GridCategorySection } from "../components/grid-category";
import { HappyCustomers } from "../components/happy-customers";
import { HeroSection } from "../components/hero";
import { NewArrivalsSection } from "../components/new-arrivals";
import { TopSellingsSection } from "../components/top-sellings";

export function HomePage() {
  return (
    <main>
      {/* <HeroSection />
      <TopSellingsSection />
      <GridCategorySection />
      <HappyCustomers /> */}
      <NewArrivalsSection />
    </main>
  );
}
