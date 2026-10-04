import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HomeCategory } from "@/config/home";

interface SectorProductsProps {
  sectorName: string;
  products: HomeCategory[];
}

export function SectorProducts({ sectorName, products }: SectorProductsProps) {
  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-20">
      <h2 className="text-section-title text-black">
        Recomendado para {sectorName.toLowerCase()}
      </h2>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {products.map(({ name, img, handle }) => {
          const card = (
            <>
              <div className="relative aspect-2/3 bg-[rgb(245,245,245)] overflow-hidden">
                <Image
                  src={img}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="flex justify-between items-center gap-2 pt-2 md:pt-3 pb-1">
                <h3 className="text-card-title text-black truncate">
                  {name}
                </h3>
                <ArrowUpRight className="shrink-0 w-5 h-5 md:w-6 md:h-6 text-black" />
              </div>
            </>
          );

          return handle ? (
            <Link key={name} href={`/product/${handle}`} className="group">
              {card}
            </Link>
          ) : (
            <div key={name} className="cursor-pointer group">
              {card}
            </div>
          );
        })}
      </div>

      <div className="mt-16 md:mt-20 max-w-2xl mx-auto text-center">
        <h3 className="text-section-title text-black">
          ¿No encuentras lo que buscas?
        </h3>
        <p
          className="mt-3 text-base text-black/60"
        >
          Analizamos tu marca y diseñamos una propuesta de merchandising hecha
          a tu medida. Gratis, sin compromiso, 30 minutos.
        </p>
        <Link
          href="/brand-session"
          className="mt-6 inline-block w-fit rounded-full border border-black bg-black text-white px-5 py-2.5 text-[14px] font-medium hover:bg-transparent hover:text-black transition-colors"
        >
          Reservar mi Brand Session →
        </Link>
      </div>
    </section>
  );
}
