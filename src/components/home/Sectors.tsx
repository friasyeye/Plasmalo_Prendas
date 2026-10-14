import type { Sector } from "@/config/home";
import { SectorCard } from "@/components/sectores/SectorCard";

interface SectorsProps {
  sectors: Sector[];
}

export function Sectors({ sectors }: SectorsProps) {
  return (
    <section id="sectores" className="scroll-mt-16 bg-white px-4 md:px-8 py-12 md:py-16">
      <h2 className="mb-6 md:mb-8 text-section-title text-black">
        Ropa de tu sector pensada para el día a día
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-black/10">
        {sectors.map((sector) => (
          <SectorCard key={sector.slug} {...sector} />
        ))}
      </div>
    </section>
  );
}
