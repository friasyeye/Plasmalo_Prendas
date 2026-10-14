import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { sectors } from "@/config/home";
import { catalogSections } from "@/config/catalog";
import { getCatalogListing } from "@/lib/catalog/listing";
import { categoryPath } from "@/lib/catalog/paths";

/** Se regenera como mucho cada 2 h, igual que los datos del catálogo. */
export const revalidate = 7200;

/**
 * /sitemap.xml: páginas fijas + listados, categorías con productos y fichas
 * de cada sección del catálogo. Sale de Shopify, así que un producto o una
 * categoría nueva entran solos. Las URLs con filtros no van (no se indexan).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/",
    "/brand-session",
    "/club-plasmalo",
    "/sectores",
    ...sectors.map(({ slug }) => `/sectores/${slug}`),
  ];

  const listings = await Promise.all(
    catalogSections.map((section) => getCatalogListing(section))
  );
  const catalogPaths = listings.flatMap((listing) =>
    listing
      ? [
          listing.path,
          ...listing.categories.map((category) => categoryPath(listing.section, category)),
          ...listing.products.map(({ path }) => path),
        ]
      : []
  );

  return [...staticPaths, ...catalogPaths].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
