import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Sectors } from "@/components/home/Sectors";
import { BrandSession } from "@/components/home/BrandSession";
import { Testimonials } from "@/components/home/Testimonials";
import { ResponsibleManufacturing } from "@/components/home/ResponsibleManufacturing";
import { ClubPlasmalo } from "@/components/home/ClubPlasmalo";
import { getFeaturedProducts } from "@/lib/shopify/client";
import { placeholderHomeCategories, sectors } from "@/config/home";

const HOME_GRID_SIZE = 5;

export default async function Home() {
  // Productos reales de la colección "destacados"; los placeholders rellenan
  // los huecos hasta completar el grid de 4 tarjetas.
  const featuredProducts = await getFeaturedProducts();
  const categories = [...featuredProducts, ...placeholderHomeCategories].slice(
    0,
    HOME_GRID_SIZE
  );

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <Categories categories={categories} />
        <Sectors sectors={sectors} />
        <BrandSession />
        <Testimonials />
        <ResponsibleManufacturing />
        <ClubPlasmalo />
      </main>
      <Footer />
    </>
  );
}
