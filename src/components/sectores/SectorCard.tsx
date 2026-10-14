import Image from "next/image";
import Link from "next/link";
import type { Sector } from "@/config/home";

/**
 * Tarjeta de un sector (foto + nombre + tagline en degradado). La usan tanto
 * la sección de sectores en la Home como la grid de /sectores: es el mismo
 * diseño en dos sitios distintos, así que vive aquí una sola vez.
 */
export function SectorCard({ name, img, tagline, slug }: Sector) {
  return (
    <Link
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
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <h3
          className="text-card-title text-white"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
        >
          {name}
        </h3>
        <p
          className="mt-1 text-caption text-white/80"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
        >
          {tagline}
        </p>
      </div>
    </Link>
  );
}
