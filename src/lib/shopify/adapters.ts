/**
 * Adaptadores: traducen los tipos crudos de Shopify (./types.ts) a los tipos
 * de dominio de la app (src/types o src/config).
 *
 * Este es el patrón "adapter": el resto de la aplicación nunca ve la forma
 * de la API de Shopify. Si Shopify cambia su esquema, o algún día se migra
 * de plataforma, solo se toca esta capa.
 */

import type {
  ShopifyFeaturedProductsResponse,
  ShopifyProductResponse,
  ShopifyTopBarMessagesResponse,
} from "./types";
import type { HomeCategory } from "@/config/home";
import type { Product, PriceTier, ProductOption, ProductVariant } from "@/types";

/**
 * Traduce la respuesta de getFeaturedProductsQuery a la forma que pinta
 * Categories.tsx. Devuelve [] si la colección no existe o no tiene productos;
 * los productos sin imagen se descartan (una tarjeta sin foto no se pinta).
 */
export function toHomeFeaturedCategories(
  raw: ShopifyFeaturedProductsResponse
): HomeCategory[] {
  const products = raw.collection?.products.nodes ?? [];

  return products.flatMap((product) => {
    const [firstImage, secondImage] = product.images.nodes;
    if (!firstImage) return [];

    return {
      name: product.title,
      img: firstImage.url,
      hoverImg: secondImage?.url,
      handle: product.handle,
    };
  });
}

/**
 * Traduce la respuesta de getTopBarMessagesQuery a un array de frases.
 * Devuelve null si el metafield no existe o su valor no es un array de
 * strings válido, para que el caller decida el fallback.
 */
export function toTopBarMessages(raw: ShopifyTopBarMessagesResponse): string[] | null {
  const rawValue = raw.shop.metafield?.value;
  if (!rawValue) return null;

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Un metacampo de tipo "Dinero" en un metaobjeto llega como un string JSON
 * (p. ej. '{"amount":"8.1","currency_code":"EUR"}'), no como número plano.
 */
function parseMoneyFieldValue(value: string): number {
  const parsed: { amount: string } = JSON.parse(value);
  return Number(parsed.amount);
}

/**
 * Traduce la respuesta de getProductQuery a Product (tipo de dominio),
 * incluyendo la tabla de tramos de precio leída del metaobjeto enlazado.
 * Devuelve null si el producto no existe.
 */
export function toProduct(raw: ShopifyProductResponse): Product | null {
  const product = raw.product;
  if (!product) return null;

  const tierNodes = product.pricingTable?.reference?.field?.references.nodes ?? [];

  const priceTiers: PriceTier[] = tierNodes
    .map((tier) => ({
      minQuantity: Number(tier.cantidadMinima.value),
      unitPrice: parseMoneyFieldValue(tier.precioSinIva.value),
    }))
    .sort((a, b) => a.minQuantity - b.minQuantity);

  const options: ProductOption[] = product.options.map((option) => ({
    name: option.name,
    values: option.optionValues.map((v) => v.name),
  }));

  const variants: ProductVariant[] = product.variants.nodes.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    selectedOptions: Object.fromEntries(
      variant.selectedOptions.map((o) => [o.name, o.value])
    ),
    image: variant.image ?? undefined,
    galleryImages:
      variant.gallery?.references?.nodes
        .map((node) => node.image)
        .filter((image): image is NonNullable<typeof image> => Boolean(image)) ?? [],
  }));

  return {
    handle: product.handle,
    title: product.title,
    description: product.description,
    featuredImage: product.featuredImage ?? undefined,
    options,
    variants,
    priceTiers,
  };
}
