import { getShopifyConfig } from "@/config/env";
import {
  getCollectionQuery,
  getCollectionsHaveProductsQuery,
  getFeaturedProductsQuery,
} from "./queries/collections";
import {
  getProductPhotosQuery,
  getProductQuery,
  getProductVariantsPageQuery,
} from "./queries/product";
import { getTopBarMessagesQuery } from "./queries/shop";
import {
  toCatalogCollection,
  toHomeFeaturedProducts,
  toProduct,
  toProductPhoto,
  toTopBarMessages,
} from "./adapters";
import type {
  ShopifyCollectionResponse,
  ShopifyCollectionsHaveProductsResponse,
  ShopifyFeaturedProductsResponse,
  ShopifyProductPhotosResponse,
  ShopifyProductResponse,
  ShopifyProductVariantsPageResponse,
  ShopifyTopBarMessagesResponse,
} from "./types";
import type { CatalogCollection, Product, ProductImage, ProductSummary } from "@/types";
import { topBarMessages as topBarMessagesFallback } from "@/config/site";

/**
 * Cliente mínimo de la Shopify Storefront API (GraphQL).
 *
 * Es la ÚNICA puerta de salida hacia Shopify: ningún componente hace fetch
 * directo. Los server components llaman a funciones de esta capa, que a su
 * vez usan shopifyFetch con un documento GraphQL de ./queries.
 */

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  /**
   * Segundos de caché ISR para esta petición (revalidate de Next.js).
   * Por defecto 2h; los webhooks de Shopify harán revalidación on-demand.
   */
  revalidate?: number;
}

const DEFAULT_REVALIDATE_SECONDS = 7200; // 2 horas

export async function shopifyFetch<TData>({
  query,
  variables,
  revalidate = DEFAULT_REVALIDATE_SECONDS,
}: ShopifyFetchOptions): Promise<TData> {
  const { storeDomain, storefrontAccessToken, apiVersion } = getShopifyConfig();

  const response = await fetch(
    `https://${storeDomain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify respondió ${response.status} ${response.statusText}`);
  }

  const json: { data?: TData; errors?: Array<{ message: string }> } =
    await response.json();

  if (json.errors?.length) {
    throw new Error(`Error GraphQL de Shopify: ${json.errors[0].message}`);
  }

  if (!json.data) {
    throw new Error("Shopify no devolvió datos");
  }

  return json.data;
}

const FEATURED_COLLECTION_HANDLE = "destacados";

/**
 * Foto de un producto para una tarjeta (Home): la primera del color pedido o,
 * si no se pide color o no existe, la portada. Consulta ligera (solo fotos).
 * Devuelve null si el producto no existe o falla la petición.
 */
export async function getProductPhoto(
  handle: string,
  color?: string
): Promise<ProductImage | null> {
  try {
    const data = await shopifyFetch<ShopifyProductPhotosResponse>({
      query: getProductPhotosQuery,
      variables: { handle },
    });
    return toProductPhoto(data, color);
  } catch {
    return null;
  }
}

/**
 * Hasta 12 productos de la colección "destacados" (gestionada por el cliente
 * desde el admin de Shopify; el orden de la colección es el de la fila de la
 * Home). `photoColors` (handle -> color) es opcional: solo los productos que
 * aparezcan ahí piden una foto de color concreto, el resto usa su portada, así
 * que cambiar los productos de la colección nunca rompe nada.
 * Devuelve [] si la colección no existe, está vacía, o falla la petición;
 * la Home no pinta la fila.
 */
export async function getFeaturedProducts(
  photoColors: Record<string, string> = {}
): Promise<ProductSummary[]> {
  try {
    const data = await shopifyFetch<ShopifyFeaturedProductsResponse>({
      query: getFeaturedProductsQuery,
      variables: { handle: FEATURED_COLLECTION_HANDLE },
    });
    return await Promise.all(
      toHomeFeaturedProducts(data).map(async (product) => {
        const color = photoColors[product.handle];
        if (!color) return product;
        const image = await getProductPhoto(product.handle, color);
        return image ? { ...product, image } : product;
      })
    );
  } catch {
    return [];
  }
}

/**
 * Una colección con TODOS sus productos (en el orden del admin), para los
 * listados de catálogo. Shopify devuelve máx. 250 por petición: se piden las
 * páginas restantes y se juntan antes de traducir.
 *
 * Devuelve null si la colección no existe (la página hace notFound). Los
 * errores de red/API se propagan a propósito: un listado vacío por un fallo
 * puntual se confundiría con "no hay productos" y quedaría en caché.
 */
export async function getCollection(handle: string): Promise<CatalogCollection | null> {
  const data = await shopifyFetch<ShopifyCollectionResponse>({
    query: getCollectionQuery,
    variables: { handle },
  });
  if (!data.collection) return null;

  let { pageInfo } = data.collection.products;
  while (pageInfo.hasNextPage && pageInfo.endCursor) {
    const page = await shopifyFetch<ShopifyCollectionResponse>({
      query: getCollectionQuery,
      variables: { handle, after: pageInfo.endCursor },
    });
    if (!page.collection) break;
    data.collection.products.nodes.push(...page.collection.products.nodes);
    pageInfo = page.collection.products.pageInfo;
  }

  return toCatalogCollection(data);
}

/**
 * De una lista de handles de colección, los que tienen al menos un producto
 * (la franja de categorías no enseña categorías vacías). Una sola petición.
 * Si falla, devuelve todos: mejor una categoría vacía que quedarse sin franja.
 */
export async function getNonEmptyCollections(handles: string[]): Promise<Set<string>> {
  if (handles.length === 0) return new Set();
  try {
    const data = await shopifyFetch<ShopifyCollectionsHaveProductsResponse>({
      query: getCollectionsHaveProductsQuery(handles.length),
      variables: Object.fromEntries(handles.map((handle, i) => [`h${i}`, handle])),
    });
    return new Set(handles.filter((_, i) => (data[`c${i}`]?.products.nodes.length ?? 0) > 0));
  } catch {
    return new Set(handles);
  }
}

/**
 * Producto completo para su ficha (/prendas/[categoria]/[handle]), incluyendo su tabla de tramos
 * de precio (leída del metaobjeto enlazado vía el metacampo
 * custom.tabla_de_precios). Devuelve null si el producto no existe.
 *
 * `revalidate` opcional: el checkout lo llama con 0 (datos frescos, sin
 * caché) porque para COBRAR los tramos deben ser los actuales; el ISR de 2h
 * solo vale para pintar páginas.
 */
export async function getProduct(
  handle: string,
  options?: { revalidate?: number }
): Promise<Product | null> {
  const revalidate = options?.revalidate;
  const data = await shopifyFetch<ShopifyProductResponse>({
    query: getProductQuery,
    variables: { handle },
    revalidate,
  });
  if (!data.product) return null;

  // Shopify devuelve máx. 250 variantes por petición: se piden las páginas
  // restantes y se juntan antes de traducir.
  let { pageInfo } = data.product.variants;
  while (pageInfo.hasNextPage && pageInfo.endCursor) {
    const page = await shopifyFetch<ShopifyProductVariantsPageResponse>({
      query: getProductVariantsPageQuery,
      variables: { handle, after: pageInfo.endCursor },
      revalidate,
    });
    if (!page.product) break;
    data.product.variants.nodes.push(...page.product.variants.nodes);
    pageInfo = page.product.variants.pageInfo;
  }

  return toProduct(data);
}

const TOPBAR_REVALIDATE_SECONDS = 300; // 5 minutos

/**
 * Frases del banner superior (custom.topbar_messages, metafield del Shop),
 * editables por el cliente desde el admin sin tocar código. Si el metafield
 * no existe o falla la petición, devuelve el fallback hardcodeado de
 * config/site.ts.
 *
 * Caché más corta que el resto del catálogo (5 min vs. 2h): es un banner
 * promocional que el cliente espera ver reflejado casi al momento.
 */
export async function getTopBarMessages(): Promise<string[]> {
  try {
    const data = await shopifyFetch<ShopifyTopBarMessagesResponse>({
      query: getTopBarMessagesQuery,
      revalidate: TOPBAR_REVALIDATE_SECONDS,
    });
    return toTopBarMessages(data) ?? topBarMessagesFallback;
  } catch {
    return topBarMessagesFallback;
  }
}
