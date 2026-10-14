import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Sectors } from "@/components/home/Sectors";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { BrandSession } from "@/components/home/BrandSession";
import { Testimonials } from "@/components/home/Testimonials";
import { ResponsibleManufacturing } from "@/components/home/ResponsibleManufacturing";
import { ClubPlasmalo } from "@/components/home/ClubPlasmalo";
import { getFeaturedProducts, getProductPhoto } from "@/lib/shopify/client";
import { toCatalogProducts } from "@/lib/catalog/paths";
import { featuredPhotoColors, homeCategories, sectors } from "@/config/home";
import type { HomeCategory } from "@/config/home";

export default async function Home() {
  // Fila de productos: colección "destacados" de Shopify (vacía = no se pinta).
  // Foto de cada categoría: la de un producto real; si no existe, no se pinta.
  const [featured, categoryPhotos] = await Promise.all([
    getFeaturedProducts(featuredPhotoColors),
    Promise.all(
      homeCategories.map(({ photoHandle, photoColor }) =>
        getProductPhoto(photoHandle, photoColor)
      )
    ),
  ]);
  const featuredProducts = toCatalogProducts(featured);
  const categories = homeCategories.flatMap(({ name, href }, i): HomeCategory[] => {
    const img = categoryPhotos[i]?.url;
    return img ? [{ name, href, img }] : [];
  });

  return (
    <>
      <Navbar variant="overlay" />
      <main>
        <Hero />
        <Categories categories={categories} />
        <FeaturedProducts products={featuredProducts} />
        <Sectors sectors={sectors} />
        <MarqueeStrip />
        <BrandSession />
        <Testimonials />
        <ResponsibleManufacturing />
        <ClubPlasmalo />
      </main>
      <Footer />
    </>
  );
}
