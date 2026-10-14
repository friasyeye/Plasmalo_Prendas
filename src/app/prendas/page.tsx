import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogListingView } from "@/components/catalog/CatalogListingView";
import { prendasSection } from "@/config/catalog";
import { buildCatalogView, isFilteredQuery, parseCatalogQuery } from "@/lib/catalog/filters";
import { catalogMetadata, getCatalogListing } from "@/lib/catalog/listing";

interface PrendasPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PrendasPageProps): Promise<Metadata> {
  const listing = await getCatalogListing(prendasSection);
  if (!listing) return {};
  return catalogMetadata(listing, isFilteredQuery(parseCatalogQuery(await searchParams)));
}

/** Todas las prendas, con la franja de categorías y los filtros. */
export default async function PrendasPage({ searchParams }: PrendasPageProps) {
  const listing = await getCatalogListing(prendasSection);
  if (!listing) notFound();

  const view = buildCatalogView(listing.products, parseCatalogQuery(await searchParams));

  return (
    <>
      <Navbar />
      <CatalogListingView listing={listing} view={view} />
      <Footer />
    </>
  );
}
