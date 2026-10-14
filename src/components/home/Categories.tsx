import Image from "next/image";
import Link from "next/link";
import type { HomeCategory } from "@/config/home";

interface CategoriesProps {
  categories: HomeCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <section className="bg-white pt-0.5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10">
        {categories.map(({ name, img, hoverImg, href }) => {
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
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                  <h3 className="text-tile-label text-white truncate">
                    {name}
                  </h3>
                </div>
              </div>
            </>
          );

          return href ? (
            <Link key={name} href={href} className="group">
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
