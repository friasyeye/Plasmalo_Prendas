import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Testimonials } from "@/components/home/Testimonials";
import { getFeaturedProducts } from "@/lib/shopify/client";
import { placeholderHomeCategories } from "@/config/home";

const HOME_GRID_SIZE = 4;

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
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
