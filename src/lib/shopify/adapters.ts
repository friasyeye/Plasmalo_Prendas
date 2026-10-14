/**
 * Adaptadores: traducen los tipos crudos de Shopify (./types.ts) a los tipos
 * de dominio de la app (src/types o src/config).
 *
 * Este es el patrón "adapter": el resto de la aplicación nunca ve la forma
 * de la API de Shopify. Si Shopify cambia su esquema, o algún día se migra
 * de plataforma, solo se toca esta capa.
 */

import type {
  ShopifyCollectionResponse,
  ShopifyFeaturedProductsResponse,
  ShopifyProductPhotosResponse,
  ShopifyProductResponse,
  ShopifyProductSummary,
  ShopifyTopBarMessagesResponse,
} from "./types";
import type {
  CatalogCollection,
  PriceTier,
  Product,
  ProductDetailSection,
  ProductImage,
  ProductOption,
  ProductSummary,
  ProductVariant,
} from "@/types";

/**
 * Traduce una lista de productos a tarjetas. Los productos sin imagen se
 * descartan: una tarjeta sin foto no se pinta.
 */
function toProductSummaries(products: ShopifyProductSummary[]): ProductSummary[] {
  return products.flatMap((product) => {
    if (!product.featuredImage) return [];

    const colorOption = product.options.find((option) => option.name === "Color");
    return {
      handle: product.handle,
      title: product.title,
      productType: product.productType,
      tags: product.tags,
      collections: product.collections.nodes.map(({ handle }) => handle),
      image: product.featuredImage,
      colors: colorOption?.optionValues.map((value) => value.name) ?? [],
    };
  });
}

/**
 * Traduce la respuesta de getFeaturedProductsQuery a las tarjetas de la fila
 * de la Home. Devuelve [] si la colección no existe o no tiene productos.
 */
export function toHomeFeaturedProducts(
  raw: ShopifyFeaturedProductsResponse
): ProductSummary[] {
  return toProductSummaries(raw.collection?.products.nodes ?? []);
}

/**
 * Traduce una colección (con TODAS sus páginas de productos ya juntadas) al
 * tipo de dominio. Null si la colección no existe en el canal de la web.
 */
export function toCatalogCollection(
  raw: ShopifyCollectionResponse
): CatalogCollection | null {
  const collection = raw.collection;
  if (!collection) return null;

  return {
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    seoTitle: collection.seo.title || null,
    seoDescription: collection.seo.description || null,
    products: toProductSummaries(collection.products.nodes),
  };
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

const HTML_ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

/** Quita etiquetas HTML, decodifica las entidades habituales y normaliza espacios. */
function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, (entity) => HTML_ENTITIES[entity])
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * La descripción del producto en Shopify sigue este formato (el que genera el
 * CSV de importación y conserva el editor del admin):
 *
 *   <p>Texto introductorio.</p>
 *   <p><strong>Composición:</strong><br />línea 1<br />línea 2</p>
 *   <p><strong>Detalles:</strong><br />línea 1<br />línea 2</p>
 *
 * El primer párrafo sin título es la intro; cada párrafo con <strong> inicial
 * es una sección desplegable. Una descripción de texto libre da intro y
 * ninguna sección, sin romper nada.
 */
function parseDescriptionHtml(html: string): {
  intro: string;
  details: ProductDetailSection[];
} {
  let intro = "";
  const details: ProductDetailSection[] = [];

  for (const match of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const paragraph = match[1];
    const section = paragraph.match(
      /^\s*<strong>([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?([\s\S]*)$/i
    );

    if (!section) {
      if (!intro) intro = htmlToText(paragraph);
      continue;
    }

    const items = section[2]
      .split(/<br\s*\/?>/i)
      .map(htmlToText)
      .filter(Boolean);
    const title = htmlToText(section[1]).replace(/:$/, "");
    if (title && items.length > 0) details.push({ title, items });
  }

  return { intro, details };
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
  }));

  const { intro, details } = parseDescriptionHtml(product.descriptionHtml);

  return {
    handle: product.handle,
    title: product.title,
    collections: product.collections.nodes.map(({ handle }) => handle),
    // Descripción sin formato (p. ej. el producto antiguo): se usa tal cual.
    description: intro || product.description,
    details,
    images: product.images.nodes,
    featuredImage: product.featuredImage ?? undefined,
    options,
    variants,
    priceTiers,
  };
}

/**
 * Foto de un producto para una tarjeta: la primera del color pedido (la del
 * modelo va primero, ver docs/catalogo.md) o, si no se pide color o no existe,
 * la portada. Null si el producto no existe o no tiene fotos.
 */
export function toProductPhoto(
  raw: ShopifyProductPhotosResponse,
  color?: string
): ProductImage | null {
  const product = raw.product;
  if (!product) return null;

  const colorImage = color
    ? product.images.nodes.find((image) => image.altText?.endsWith(` - ${color}`))
    : undefined;
  return colorImage ?? product.featuredImage;
}
