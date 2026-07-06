/**
 * Tipos CRUDOS de la Shopify Storefront API: la forma exacta en que Shopify
 * devuelve los datos por GraphQL (con sus edges/nodes, importes como string,
 * etc.).
 *
 * Estos tipos no deben salir de src/lib/shopify: adapters.ts los traduce a
 * los tipos de dominio de src/types antes de entregarlos al resto de la app.
 *
 * Se completarán al escribir cada query (los campos deben reflejar
 * exactamente lo que pide el documento GraphQL correspondiente).
 */

/** Los importes de dinero llegan como string decimal, p. ej. "12.50". */
export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}
