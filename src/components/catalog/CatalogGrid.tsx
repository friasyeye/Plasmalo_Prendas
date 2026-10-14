import type { CatalogProduct } from "@/types";
import { ProductCard } from "./ProductCard";

/** Tarjetas de la primera fila (4 en escritorio): se precargan para el LCP. */
const PRELOADED_CARDS = 4;

/** Rejilla de tarjetas de producto: 2 columnas en móvil, 3 en tablet, 4 en escritorio. */
export function CatalogGrid({ products }: { products: CatalogProduct[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 md:gap-x-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <li key={product.handle}>
          <ProductCard
            product={product}
            preload={index < PRELOADED_CARDS}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </li>
      ))}
    </ul>
  );
}
