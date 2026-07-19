import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectorHero } from "@/components/sectores/SectorHero";
import { SectorProducts } from "@/components/sectores/SectorProducts";
import { sectorPages } from "@/config/sectores";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = sectorPages[slug];

  if (!sector) {
    notFound();
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <SectorHero sector={sector} />
        <SectorProducts sectorName={sector.name} products={sector.products} />
      </main>
      <Footer />
    </>
  );
}
