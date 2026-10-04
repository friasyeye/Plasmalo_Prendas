import Image from "next/image";
import Link from "next/link";
import type { Sector } from "@/config/home";

interface SectorsProps {
  sectors: Sector[];
}

export function Sectors({ sectors }: SectorsProps) {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-16">
      <div className="mb-6 md:mb-8">
        <h2 className="text-section-title text-black">
          Tu marca, tu sector, tu identidad
        </h2>
        <p className="mt-2 text-body text-black/60">
          Soluciones a medida para cada tipo de empresa
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-black/10">
        {sectors.map(({ name, img, slug }) => {
          return (
            <Link
              key={name}
              href={`/sectores/${slug}`}
              className="relative aspect-2/3 overflow-hidden bg-[rgb(245,245,245)] cursor-pointer group"
            >
              <Image
                src={img}
                alt={name}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <h3
                  className="text-card-title text-white"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                >
                  {name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
