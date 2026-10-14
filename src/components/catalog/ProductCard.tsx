import Image from "next/image";
import Link from "next/link";
import { swatchBackground } from "@/lib/colors";
import { UNISEX_TAG } from "@/config/catalog";
import type { CatalogProduct } from "@/types";

interface ProductCardProps {
  product: CatalogProduct;
  /** `sizes` de la imagen según el ancho de la tarjeta en cada pantalla. */
  sizes: string;
  /** False en filas con arrastre: el navegador no debe "coger" el enlace ni la foto. */
  draggable?: boolean;
  /** Las primeras tarjetas visibles cargan con prioridad (mejora el LCP). */
  preload?: boolean;
}

const MAX_SWATCHES = 5;

/**
 * Las fotos de modelo son verticales (~2:3) y rellenan la tarjeta. Las que no
 * lo son (gorros, bolsas: packshots cuadrados) se enseñan enteras en vez de
 * recortarlas.
 */
function isPortrait({ width, height }: { width: number; height: number }) {
  const ratio = width / height;
  return ratio > 0.55 && ratio < 0.85;
}

/**
 * Tarjeta de producto: foto 2:3, nombre y muestras de color. Home y listados.
 * Las prendas con la etiqueta Unisex en Shopify llevan un badge sobre la foto
 * (su foto puede ser de un modelo hombre aunque se esté filtrando por Mujer).
 */
export function ProductCard({ product, sizes, draggable, preload }: ProductCardProps) {
  const { path, title, image, colors, tags } = product;
  const unisex = tags.includes(UNISEX_TAG);

  return (
    <Link href={path} draggable={draggable} className="group block">
      <div className="relative aspect-2/3 overflow-hidden bg-white">
        <Image
          src={image.url}
          alt={title}
          fill
          draggable={draggable}
          sizes={sizes}
          preload={preload}
          className={`transition-transform duration-500 group-hover:scale-[1.03] ${
            isPortrait(image) ? "object-cover" : "object-contain"
          }`}
        />
        {unisex && (
          <span className="absolute top-2 right-2 bg-[rgb(240,240,240)] px-2 py-0.5 text-xs font-medium text-black/70">
            Unisex
          </span>
        )}
      </div>
      <h3 className="mt-2 text-sm text-black truncate">{title}</h3>
      {colors.length > 1 && (
        <div className="mt-1.5 flex items-center gap-1">
          {colors.slice(0, MAX_SWATCHES).map((color) => (
            <span
              key={color}
              title={color}
              className="h-2.5 w-2.5 border border-black/15 bg-gray-200"
              style={{ background: swatchBackground(color) ?? undefined }}
            />
          ))}
          {colors.length > MAX_SWATCHES && (
            <span className="ml-0.5 text-xs text-black/50">
              +{colors.length - MAX_SWATCHES}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
