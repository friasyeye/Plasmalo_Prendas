/**
 * Único punto del proyecto que lee process.env.
 *
 * Ventajas de centralizarlo:
 * - Si falta una variable, el error dice exactamente cuál (en lugar de un
 *   `undefined` críptico en mitad de una petición a Shopify).
 * - Este archivo documenta qué variables necesita el proyecto (ver .env.example).
 *
 * La lectura es "perezosa" (funciones, no constantes): las variables solo se
 * exigen cuando algo las usa de verdad. Así el proyecto compila y arranca
 * aunque Shopify aún no esté configurado.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. Añádela a .env.local (ver .env.example).`
    );
  }
  return value;
}

export function getShopifyConfig() {
  return {
    /** Dominio de la tienda, p. ej. "plasmalo.myshopify.com" */
    storeDomain: requireEnv("SHOPIFY_STORE_DOMAIN"),
    /** Token público de la Storefront API (Headless app en el admin de Shopify) */
    storefrontAccessToken: requireEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN"),
    /** Versión de la Storefront API con la que se ha desarrollado */
    apiVersion: "2026-04",
  };
}
