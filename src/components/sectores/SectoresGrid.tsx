import type { Sector } from "@/config/home";
import { SectorCard } from "@/components/sectores/SectorCard";

interface SectoresGridProps {
  sectors: Sector[];
}

/** Grid de los 6 sectores en /sectores, mismo fondo blanco que el hero. */
export function SectoresGrid({ sectors }: SectoresGridProps) {
  return (
    <section className="bg-white px-4 md:px-8 pb-16 md:pb-24">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-black/10">
        {sectors.map((sector) => (
          <SectorCard key={sector.slug} {...sector} />
        ))}
      </div>
    </section>
  );
}
