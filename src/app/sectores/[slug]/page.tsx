import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectorListingView } from "@/components/sectores/SectorListingView";
import { sectors } from "@/config/home";
import { getSectorPage, getSectorProducts, sectorMetadata } from "@/lib/catalog/sector";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return sectors.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const sector = getSectorPage((await params).slug);
  return sector ? sectorMetadata(sector) : {};
}

/** Prendas de un sector: las de Shopify que llevan su etiqueta. */
export default async function SectorPage({ params }: SectorPageProps) {
  const sector = getSectorPage((await params).slug);
  if (!sector) notFound();

  const products = await getSectorProducts(sector.tag);

  return (
    <>
      <Navbar />
      <SectorListingView sector={sector} products={products} />
      <Footer />
    </>
  );
}
