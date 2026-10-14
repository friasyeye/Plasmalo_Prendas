import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogListingView } from "@/components/catalog/CatalogListingView";
import { prendasSection } from "@/config/catalog";
import { buildCatalogView, isFilteredQuery, parseCatalogQuery } from "@/lib/catalog/filters";
import { catalogMetadata, getCatalogListing } from "@/lib/catalog/listing";

interface CategoryPageProps {
  params: Promise<{ categoria: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { categoria } = await params;
  const listing = await getCatalogListing(prendasSection, categoria);
  if (!listing) return {};
  return catalogMetadata(listing, isFilteredQuery(parseCatalogQuery(await searchParams)));
}

/** Una categoría de prendas: misma plantilla que /prendas, con su propia URL y texto. */
export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { categoria } = await params;
  const listing = await getCatalogListing(prendasSection, categoria);
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
