import FFNavbar from "@/components/FFNavbar";
import { FFHero } from "@/components/FFHero";
import { FFCategories } from "@/components/FFCategories";
import { FFProductGrid } from "@/components/FFProductGrid";
import { FFSaleBanner } from "@/components/FFSaleBanner";
import { FFTestimonials } from "@/components/FFTestimonials";
import { FFFooter } from "@/components/FFFooter";

const trendingProducts = [
  {
    name: "Grey Comfort",
    category: "Hoodies",
    price: "$250.00",
    image: "/fabfit/product-grey-comfort.png",
  },
  {
    name: "Dust Bowl Jersey",
    category: "Jerseys",
    price: "$200.00",
    salePrice: "$200.00",
    image: "/fabfit/product-dust-bowl.jpg",
  },
  {
    name: "After Hours Jersey",
    category: "Jerseys",
    price: "$250.00",
    image: "/fabfit/product-after-hours.jpg",
  },
];

const newArrivals = [
  {
    name: "Peak Sunglasses",
    category: "",
    price: "$129.00",
    image: "/fabfit/product-sunglasses.png",
  },
  {
    name: "Classic Duffel",
    category: "Accessories",
    price: "$129.00",
    image: "/fabfit/product-duffel.jpg",
  },
  {
    name: "Water Bottle (Ghost)",
    category: "Accessories",
    price: "$75.00",
    image: "/fabfit/product-water-bottle.jpg",
  },
];

export default function Home() {
  return (
    <>
      <FFNavbar />
      <main>
        <FFHero />
        <FFCategories />
        <FFProductGrid title="Trending Now" products={trendingProducts} />
        <FFSaleBanner />
        <FFProductGrid title="New Arrivals" products={newArrivals} />
        <FFTestimonials />
      </main>
      <FFFooter />
    </>
  );
}
