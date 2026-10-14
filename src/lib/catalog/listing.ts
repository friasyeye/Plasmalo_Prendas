import { cache } from "react";
import type { Metadata } from "next";
import { getCollection, getNonEmptyCollections } from "@/lib/shopify/client";
import type { CatalogCategory, CatalogSection } from "@/config/catalog";
import type { CatalogCollection, CatalogProduct } from "@/types";
import { categoryPath, toCatalogProducts } from "./paths";

/** Todo lo que necesita una página de listado (sección completa o una categoría). */
export interface CatalogListing {
  section: CatalogSection;
  /** Undefined en el listado completo de la sección (/prendas). */
  category?: CatalogCategory;
  collection: CatalogCollection;
  /** Productos de la colección con su URL (en el orden del admin). */
  products: CatalogProduct[];
  /** Categorías de la franja: solo las que tienen productos. */
  categories: CatalogCategory[];
  /** Ruta de esta página, sin query: es la URL canónica. */
  path: string;
}

/**
 * Carga un listado. Null si la categoría no existe en la config o su
 * colección no existe en Shopify (la página hace notFound).
 *
 * Con `cache` de React, generateMetadata y la página comparten la misma
 * llamada dentro de una petición en vez de repetirla.
 */
export const getCatalogListing = cache(
  async (section: CatalogSection, categorySlug?: string): Promise<CatalogListing | null> => {
    const category = categorySlug
      ? section.categories.find(({ slug }) => slug === categorySlug)
      : undefined;
    if (categorySlug && !category) return null;

    const [collection, nonEmpty] = await Promise.all([
      getCollection(category?.collection ?? section.collection),
      getNonEmptyCollections(section.categories.map(({ collection }) => collection)),
    ]);
    if (!collection) return null;

    return {
      section,
      category,
      collection,
      products: toCatalogProducts(collection.products),
      categories: section.categories.filter(({ collection }) => nonEmpty.has(collection)),
      path: category ? categoryPath(section, category) : section.basePath,
    };
  }
);

/**
 * Metadatos SEO de un listado. Título y descripción salen del SEO de la
 * colección en el admin de Shopify; si está vacío, de su nombre y su texto.
 *
 * Con filtros la URL no se indexa (serían cientos de combinaciones
 * casi duplicadas) pero sus enlaces sí se siguen, y la canónica es siempre
 * la URL limpia. Sin filtros no se fija `robots`: manda el del layout raíz.
 */
export function catalogMetadata(listing: CatalogListing, isFiltered: boolean): Metadata {
  const { collection, category, section, path } = listing;
  const label = category?.label ?? section.label;

  return {
    title: collection.seoTitle ?? `${label} personalizables | Plásmalo`,
    description: collection.seoDescription ?? (collection.description || undefined),
    alternates: { canonical: path },
    ...(isFiltered && { robots: { index: false, follow: true } }),
  };
}
