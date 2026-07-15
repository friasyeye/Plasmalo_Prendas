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
  /** Opciones de variante disponibles, p. ej. { name: "Talla", values: ["S","M","L"] }. */
  options: ProductOption[];
  variants: ProductVariant[];
  /** Tabla de tramos de precio (desde metaobjects de Shopify). */
  priceTiers: PriceTier[];
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  availableForSale: boolean;
  /** p. ej. { Talla: "M", Color: "Negro" } */
  selectedOptions: Record<string, string>;
  image?: ProductImage;
  /**
   * Fotos de la variante (metacampo custom.galeria). Solo una variante por
   * color las lleva rellenas; la galería del color se busca en cualquiera.
   */
  galleryImages: ProductImage[];
}

export interface ProductImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

/** Una zona de personalización aplicada a una línea del carrito. */
export interface CartCustomization {
  zone: string;
  /** Precio fijo por unidad, en euros (nunca cambia con la cantidad). */
  unitPrice: number;
}

/**
 * Una línea del carrito: producto + variante (color/talla) + zonas de
 * personalización. Dos añadidos con la misma combinación se fusionan en una
 * sola línea (su `id` es determinista a partir de variante + zonas).
 *
 * El tramo de descuento NO se guarda aquí: se recalcula siempre sumando las
 * unidades de todas las líneas del mismo producto (ver lib/cart/cart.ts).
 * `priceTiers` es una copia de la tabla del producto para poder recalcular
 * sin volver a consultar Shopify.
 */
export interface CartLine {
  id: string;
  productHandle: string;
  productTitle: string;
  variantId: string;
  /** p. ej. { Color: "Rojo", Talla: "M" } */
  selectedOptions: Record<string, string>;
  image: ProductImage | null;
  quantity: number;
  customizations: CartCustomization[];
  priceTiers: PriceTier[];
  /**
   * Solo el nombre del archivo de diseño, como referencia visual: el File no
   * puede persistirse en localStorage. El archivo real se recogerá en el
   * paso de pedido (fuera del alcance del carrito).
   */
  designFileName: string | null;
  notes: string;
}
