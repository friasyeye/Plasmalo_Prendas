import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { HomeCategory } from "@/config/home";

interface CategoriesProps {
  categories: HomeCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <section className="bg-white px-8 py-16">
      <h2
        style={{
          fontFamily: "var(--font-general-sans)",
          fontSize: "36px",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
        className="text-black mb-8"
      >
        Elige la prenda y hazla tuya
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
        <div />
        <div className="flex justify-end md:col-start-4">
          <button className="text-sm font-medium text-black bg-black/10 rounded-full px-4 py-2">
            Ver todo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(({ name, img, hoverImg }) => (
          <div key={name} className="cursor-pointer group">
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
            <div className="flex justify-between items-center pt-3 pb-1">
              <h3
                style={{
                  fontFamily: "var(--font-general-sans)",
                  fontSize: "26px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
                className="text-black"
              >
                {name}
              </h3>
              <ArrowUpRight size={24} className="text-black" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
