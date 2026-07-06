/**
 * Adaptadores: traducen los tipos crudos de Shopify (./types.ts) a los tipos
 * de dominio de la app (src/types o src/config).
 *
 * Este es el patrón "adapter": el resto de la aplicación nunca ve la forma
 * de la API de Shopify. Si Shopify cambia su esquema, o algún día se migra
 * de plataforma, solo se toca esta capa.
 */

import type { ShopifyFeaturedProductResponse } from "./types";
import type { HomeCategory } from "@/config/home";

/**
 * Traduce la respuesta de getFeaturedProductQuery a la forma que pinta
 * Categories.tsx. Devuelve null si la colección no existe o no tiene
 * productos (Categories.tsx debe ocultar la tarjeta en ese caso).
 */
export function toHomeFeaturedCategory(
  raw: ShopifyFeaturedProductResponse
): HomeCategory | null {
  const product = raw.collection?.products.nodes[0];
  if (!product) return null;

  const [firstImage, secondImage] = product.images.nodes;
  if (!firstImage) return null;

  return {
    name: product.title,
    img: firstImage.url,
    hoverImg: secondImage?.url,
  };
}
