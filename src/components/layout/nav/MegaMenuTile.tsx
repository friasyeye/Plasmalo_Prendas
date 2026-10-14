import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MegaMenuTileProps {
  label: string;
  href: string;
  /** Sin imagen se pinta un placeholder gris con el texto en negro. */
  image?: string;
  /** Foto de producto: se ve entera sobre fondo blanco, con el nombre debajo. */
  contain?: boolean;
  /** Fondo blanco liso, para la tarjeta "Descubrir todo". */
  plain?: boolean;
  onNavigate: () => void;
}

/**
 * Tarjeta del mega-menú. Con imagen de escena (sectores): a sangre con el
 * nombre encima. Con foto de producto (`contain`): entera, sin recortar, y el
 * nombre en una franja inferior.
 */
export function MegaMenuTile({ label, href, image, contain, plain, onNavigate }: MegaMenuTileProps) {
  const fullBleed = image && !contain;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group relative block overflow-hidden",
        contain ? "aspect-square bg-white" : "aspect-4/5",
        !contain && (plain ? "bg-white" : "bg-[rgb(245,245,245)]")
      )}
    >
      {image && (
        <div className={cn("absolute inset-x-0 top-0", contain ? "bottom-12" : "bottom-0")}>
          <Image
            src={image}
            alt=""
            fill
            sizes="25vw"
            // El panel está oculto pero montado: eager para que la imagen ya
            // esté descargada cuando se abra el menú (lazy la aplazaría).
            loading="eager"
            className={cn(
              "transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none",
              contain ? "object-contain" : "object-cover"
            )}
          />
        </div>
      )}
      {fullBleed && (
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      )}
      <span
        className={cn(
          "absolute bottom-0 left-0 p-4 lg:p-5 text-section-title",
          fullBleed ? "text-white" : "text-black"
        )}
      >
        {label}
      </span>
    </Link>
  );
}
