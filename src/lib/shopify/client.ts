import { getShopifyConfig } from "@/config/env";
import { getFeaturedProductQuery } from "./queries/collections";
import { getProductQuery } from "./queries/product";
import { toHomeFeaturedCategory, toProduct } from "./adapters";
import type { ShopifyFeaturedProductResponse, ShopifyProductResponse } from "./types";
import type { HomeCategory } from "@/config/home";
import type { Product } from "@/types";

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
 * Primer producto de la colección "destacados" (gestionada por el cliente
 * desde el admin de Shopify), listo para pintarse en Categories.tsx.
 * Devuelve null si la colección no existe, está vacía, o falla la petición
 * (Categories.tsx oculta la tarjeta en ese caso en vez de mostrar un dato falso).
 */
export async function getFeaturedProduct(): Promise<HomeCategory | null> {
  try {
    const data = await shopifyFetch<ShopifyFeaturedProductResponse>({
      query: getFeaturedProductQuery,
      variables: { handle: FEATURED_COLLECTION_HANDLE },
    });
    return toHomeFeaturedCategory(data);
  } catch {
    return null;
  }
}

/**
 * Producto completo para /product/[handle], incluyendo su tabla de tramos
 * de precio (leída del metaobjeto enlazado vía el metacampo
 * custom.tabla_de_precios). Devuelve null si el producto no existe.
 */
export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<ShopifyProductResponse>({
    query: getProductQuery,
    variables: { handle },
  });
  return toProduct(data);
}
