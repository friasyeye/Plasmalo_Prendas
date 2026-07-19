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
        <h2 className="font-display font-semibold text-black text-3xl md:text-4xl tracking-[-0.02em]">
          Tu marca, tu sector, tu identidad
        </h2>
        <p
          className="mt-2 text-base md:text-lg text-black/60"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          Soluciones a medida para cada tipo de empresa
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {sectors.map(({ name, img, tagline, slug }, index) => {
          const isLastOdd =
            sectors.length % 2 !== 0 && index === sectors.length - 1;

          return (
            <Link
              key={name}
              href={`/sectores/${slug}`}
              className={`relative aspect-2/3 overflow-hidden bg-[rgb(245,245,245)] cursor-pointer group ${
                isLastOdd ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <Image
                src={img}
                alt={name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <h3
                  className="font-display font-semibold text-white text-2xl md:text-[32px] tracking-[-0.01em]"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                >
                  {name}
                </h3>
                <p
                  className="mt-0.5 text-xs md:text-sm text-white/90"
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                  }}
                >
                  {tagline}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
