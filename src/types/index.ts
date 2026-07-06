/**
 * Tipos de DOMINIO de Plásmalo.
 *
 * Estos son los tipos con los que trabajan los componentes y la lógica de
 * negocio. NO son los tipos crudos de la API de Shopify (esos viven en
 * lib/shopify/types.ts): lib/shopify/adapters.ts traduce de uno a otro.
 * Así, si Shopify cambia su API, solo se toca la capa de Shopify.
 *
 * Se irán completando a medida que se implemente el catálogo real.
 */

/** Un tramo de la tabla de precios por cantidad de un tipo de producto. */
export interface PriceTier {
  /** Cantidad mínima para que aplique este tramo (incluida). */
  minQuantity: number;
  /** Precio unitario de la prenda en este tramo, en euros. */
  unitPrice: number;
}

/** Producto del catálogo, ya traducido desde Shopify a nuestro dominio. */
export interface Product {
  /** Slug del producto en Shopify; se usa en la URL /product/[handle]. */
  handle: string;
  title: string;
  description: string;
  featuredImage?: ProductImage;
  /** Tabla de tramos de precio (desde metaobjects de Shopify). */
  priceTiers: PriceTier[];
}

export interface ProductImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}
