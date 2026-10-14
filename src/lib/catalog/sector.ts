import { cache } from "react";
import type { Metadata } from "next";
import { prendasSection } from "@/config/catalog";
import { sectors } from "@/config/home";
import { sectorCopy } from "@/config/sectores";
import type { CatalogProduct } from "@/types";
import { getCatalogListing } from "./listing";

/** Todo lo que necesita la página de un sector. */
export interface SectorPage {
  slug: string;
  name: string;
  title: string;
  description: string;
  /** Ruta de la página: es también su URL canónica. */
  path: string;
  /** Etiqueta de Shopify que marca los productos del sector. */
  tag: string;
}

/** Sector por slug. Null si no existe o le falta el texto (la página hace notFound). */
export function getSectorPage(slug: string): SectorPage | null {
  const sector = sectors.find((item) => item.slug === slug);
  const copy = sectorCopy[slug];
  if (!sector || !copy) return null;
  return { slug, name: sector.name, tag: sector.name, path: `/sectores/${slug}`, ...copy };
}

/**
 * Prendas de un sector: las de la colección "prendas" que llevan su etiqueta.
 * Reutiliza la carga cacheada de /prendas, así que no añade peticiones a
 * Shopify, y un producto nuevo con la etiqueta entra solo.
 */
export const getSectorProducts = cache(async (tag: string): Promise<CatalogProduct[]> => {
  const listing = await getCatalogListing(prendasSection);
  return listing?.products.filter((product) => product.tags.includes(tag)) ?? [];
});

export function sectorMetadata({ title, description, path }: SectorPage): Metadata {
  return {
    title: `${title} | Plásmalo`,
    description,
    alternates: { canonical: path },
  };
}
