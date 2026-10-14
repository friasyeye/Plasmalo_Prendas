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

/** Respuesta cruda de getTopBarMessagesQuery (shop.ts). */
export interface ShopifyTopBarMessagesResponse {
  shop: {
    metafield: {
      /** Metafield de tipo lista: llega como string JSON, p. ej. '["a","b"]'. */
      value: string;
    } | null;
  };
}

/** Producto para una tarjeta (productSummaryFields en collections.ts). */
export interface ShopifyProductSummary {
  handle: string;
  title: string;
  productType: string;
  tags: string[];
  collections: { nodes: Array<{ handle: string }> };
  featuredImage: ShopifyImage | null;
  options: ShopifyProductOption[];
}

/** Respuesta cruda de getFeaturedProductsQuery (collections.ts). */
export interface ShopifyFeaturedProductsResponse {
  collection: {
    products: { nodes: ShopifyProductSummary[] };
  } | null;
}

/** Respuesta cruda de getCollectionsHaveProductsQuery: un alias (c0, c1…) por colección. */
export type ShopifyCollectionsHaveProductsResponse = Record<
  string,
  { products: { nodes: Array<{ id: string }> } } | null
>;

/** Respuesta cruda de getCollectionQuery (collections.ts): una página. */
export interface ShopifyCollectionResponse {
  collection: {
    handle: string;
    title: string;
    /** Descripción en texto plano (sin HTML). */
    description: string;
    seo: { title: string | null; description: string | null };
    products: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: ShopifyProductSummary[];
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
}

export interface ShopifyVariantsConnection {
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  nodes: ShopifyProductVariant[];
}

/** Respuesta cruda de getProductVariantsPageQuery (product.ts). */
export interface ShopifyProductVariantsPageResponse {
  product: { variants: ShopifyVariantsConnection } | null;
}

export interface ShopifyProductOption {
  name: string;
  optionValues: Array<{ name: string }>;
}

/** Un atributo clave/valor de una línea del draft order (Admin API). */
export interface ShopifyAttributeInput {
  key: string;
  value: string;
}

/** Una línea de draftOrderCreate: variante real + precio custom por unidad. */
export interface ShopifyDraftOrderLineItemInput {
  variantId: string;
  quantity: number;
  /** Precio unitario custom. La tienda tiene "IVA incluido en el precio"
   *  activado, así que este importe debe llevar el IVA DENTRO. */
  priceOverride: {
    amount: string;
    currencyCode: string;
  };
  customAttributes: ShopifyAttributeInput[];
}

/** Variables de draftOrderCreate (draft-order.ts). */
export interface ShopifyDraftOrderInput {
  lineItems: ShopifyDraftOrderLineItemInput[];
  note: string;
  tags: string[];
}

/** Respuesta cruda de draftOrderCreateMutation (Admin API). */
export interface ShopifyDraftOrderCreateResponse {
  draftOrderCreate: {
    draftOrder: {
      id: string;
      invoiceUrl: string | null;
    } | null;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
}

/** Respuesta cruda de getProductQuery (product.ts). */
export interface ShopifyProductResponse {
  product: {
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    collections: { nodes: Array<{ handle: string }> };
    featuredImage: ShopifyImage | null;
    images: { nodes: ShopifyImage[] };
    options: ShopifyProductOption[];
    variants: ShopifyVariantsConnection;
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

/** Respuesta cruda de getProductPhotosQuery (product.ts). */
export interface ShopifyProductPhotosResponse {
  product: {
    featuredImage: ShopifyImage | null;
    images: { nodes: ShopifyImage[] };
  } | null;
}
