import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Testimonials } from "@/components/home/Testimonials";
import { getFeaturedProduct } from "@/lib/shopify/client";
import { placeholderHomeCategories } from "@/config/home";

export default async function Home() {
  const featuredProduct = await getFeaturedProduct();
  const categories = featuredProduct
    ? [featuredProduct, ...placeholderHomeCategories]
    : placeholderHomeCategories;

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
