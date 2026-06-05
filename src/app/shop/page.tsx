import { ShopHero } from "@/components/ShopHero";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductGrid } from "@/components/ProductGrid";

export default function ShopPage() {
  return (
    <main>
      <ShopHero />
      <div className="flex max-w-[1440px] mx-auto px-6 md:px-10 py-10 gap-10">
        <FilterSidebar />
        <ProductGrid />
      </div>
    </main>
  );
}
