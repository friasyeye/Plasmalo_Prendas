import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectoresHero } from "@/components/sectores/SectoresHero";
import { SectoresGrid } from "@/components/sectores/SectoresGrid";
import { sectors } from "@/config/home";

const title = "Ropa personalizada para cada sector | Plásmalo";
const description =
  "Uniformes, textil corporativo y merchandising a medida para restauración, deporte, construcción, eventos, oficinas y marcas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sectores" },
};

/** Índice de los 6 sectores: navegación hacia /sectores/[slug]. */
export default function SectoresPage() {
  return (
    <>
      <Navbar />
      <main>
        <SectoresHero />
        <SectoresGrid sectors={sectors} />
      </main>
      <Footer />
    </>
  );
}
