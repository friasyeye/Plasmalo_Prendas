import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HomeCategory } from "@/config/home";

interface CategoriesProps {
  categories: HomeCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-16">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <h2 className="font-display font-semibold text-black text-3xl md:text-4xl tracking-[-0.02em]">
          Elige la prenda y hazla tuya
        </h2>
        <button className="shrink-0 text-sm font-medium text-black bg-black/10 rounded-full px-4 py-2">
          Ver todo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map(({ name, img, hoverImg, handle }) => {
          const card = (
            <>
              <div className="relative aspect-2/3 bg-[rgb(245,245,245)] overflow-hidden">
                <Image
                  src={img}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={
                    hoverImg
                      ? "object-cover transition-opacity duration-300 group-hover:opacity-0"
                      : "object-cover"
                  }
                />
                {hoverImg && (
                  <Image
                    src={hoverImg}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
              </div>
              <div className="flex justify-between items-center gap-2 pt-2 md:pt-3 pb-1">
                <h3 className="font-display font-semibold text-black text-lg md:text-[26px] tracking-[-0.01em] truncate">
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
    </section>
  );
}
