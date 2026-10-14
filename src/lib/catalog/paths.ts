/**
 * URLs del catálogo. La categoría de un producto no se guarda en ningún sitio:
 * se deduce de las colecciones de Shopify en las que está, así que un producto
 * nuevo tiene URL en cuanto entra en una colección de categoría (por sus reglas).
 */
import {
  catalogSections,
  type CatalogCategory,
  type CatalogSection,
} from "@/config/catalog";
import type { CatalogProduct, ProductSummary } from "@/types";

export interface ProductLocation {
  section: CatalogSection;
  category: CatalogCategory;
}

export function categoryPath(section: CatalogSection, category: CatalogCategory): string {
  return `${section.basePath}/${category.slug}`;
}

/**
 * Sección y categoría de un producto: la PRIMERA categoría (en el orden de la
 * config) cuya colección lo contiene. Determinista aunque esté en varias.
 * Null si no está en ninguna (p. ej. un producto sin tipo).
 */
export function productLocation(collections: string[]): ProductLocation | null {
  for (const section of catalogSections) {
    const category = section.categories.find(({ collection }) =>
      collections.includes(collection)
    );
    if (category) return { section, category };
  }
  return null;
}

export function productPath({ section, category }: ProductLocation, handle: string): string {
  return `${categoryPath(section, category)}/${handle}`;
}

/**
 * Añade la URL a cada producto. Los que no están en ninguna categoría se
 * descartan: no tienen página, así que una tarjeta suya llevaría a un 404.
 */
export function toCatalogProducts(products: ProductSummary[]): CatalogProduct[] {
  return products.flatMap((product) => {
    const location = productLocation(product.collections);
    return location ? { ...product, path: productPath(location, product.handle) } : [];
  });
}
