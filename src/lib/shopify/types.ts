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

/** Respuesta cruda de getFeaturedProductsQuery (collections.ts). */
export interface ShopifyFeaturedProductsResponse {
  collection: {
    products: {
      nodes: Array<{
        handle: string;
        title: string;
        images: {
          nodes: ShopifyImage[];
        };
      }>;
    };
  } | null;
}

/** Un metafield "simple" de Shopify: el valor siempre llega como string. */
interface ShopifyMetafieldValue {
  value: string;
}

/** Una entrada del metaobjeto "Tramo de precio" (cantidad_minima, precio_sin_iva). */
interface ShopifyPriceTierMetaobject {
  cantidadMinima: ShopifyMetafieldValue;
  precioSinIva: ShopifyMetafieldValue;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  image: ShopifyImage | null;
  /**
   * Metacampo custom.galeria (lista de archivos): las fotos de la variante.
   * Los nodos que no sean MediaImage llegan como objeto vacío (image ausente).
   */
  gallery: {
    references: {
      nodes: Array<{ image?: ShopifyImage | null }>;
    } | null;
  } | null;
}

export interface ShopifyProductOption {
  name: string;
  optionValues: Array<{ name: string }>;
}

/** Respuesta cruda de getProductQuery (product.ts). */
export interface ShopifyProductResponse {
  product: {
    handle: string;
    title: string;
    description: string;
    featuredImage: ShopifyImage | null;
    options: ShopifyProductOption[];
    variants: {
      nodes: ShopifyProductVariant[];
    };
    pricingTable: {
      reference: {
        field: {
          references: {
            nodes: ShopifyPriceTierMetaobject[];
          };
        } | null;
      } | null;
    } | null;
  } | null;
}
