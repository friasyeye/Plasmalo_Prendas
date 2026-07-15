import "server-only";

import { getShopifyAdminConfig } from "@/config/env";

/**
 * Cliente mínimo de la Shopify ADMIN API (GraphQL) — la puerta para crear
 * draft orders desde el checkout.
 *
 * Se separa del cliente de la Storefront API (client.ts) porque son mundos
 * distintos: endpoint distinto, autenticación distinta (token SECRETO con
 * permisos de escritura vs token público de solo lectura) y caché distinta
 * (las mutaciones jamás se cachean).
 *
 * El `import "server-only"` de arriba hace que el build FALLE si este módulo
 * acaba importado desde un client component: es la red de seguridad que
 * garantiza que el token de Admin nunca viaja al navegador.
 */

interface ShopifyAdminFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
}

export async function shopifyAdminFetch<TData>({
  query,
  variables,
}: ShopifyAdminFetchOptions): Promise<TData> {
  const { storeDomain, adminAccessToken, apiVersion } = getShopifyAdminConfig();

  const response = await fetch(
    `https://${storeDomain}/admin/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": adminAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Shopify Admin respondió ${response.status} ${response.statusText}`
    );
  }

  const json: { data?: TData; errors?: Array<{ message: string }> } =
    await response.json();

  if (json.errors?.length) {
    throw new Error(`Error GraphQL de Shopify Admin: ${json.errors[0].message}`);
  }

  if (!json.data) {
    throw new Error("Shopify Admin no devolvió datos");
  }

  return json.data;
}
