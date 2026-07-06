/**
 * Adaptadores: traducen los tipos crudos de Shopify (./types.ts) a los tipos
 * de dominio de la app (src/types).
 *
 * Este es el patrón "adapter": el resto de la aplicación nunca ve la forma
 * de la API de Shopify. Si Shopify cambia su esquema, o algún día se migra
 * de plataforma, solo se toca esta capa.
 *
 * Ejemplo de lo que vivirá aquí cuando se conecte el catálogo:
 *
 *   export function toProduct(raw: ShopifyProduct): Product { ... }
 *   export function toPriceTiers(raw: ShopifyMetaobject): PriceTier[] { ... }
 */

export {};
