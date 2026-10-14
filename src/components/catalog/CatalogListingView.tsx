import Link from "next/link";
import type { CatalogListing } from "@/lib/catalog/listing";
import { categoryPath } from "@/lib/catalog/paths";
import { catalogQueryToString, clearFilters, type CatalogView } from "@/lib/catalog/filters";
import type { CatalogProduct } from "@/types";
import { Breadcrumbs } from "./Breadcrumbs";
import { CategoryStrip } from "./CategoryStrip";
import { CatalogGrid } from "./CatalogGrid";
import { CatalogResults } from "./CatalogResults";

interface CatalogListingViewProps {
  listing: CatalogListing;
  view: CatalogView<CatalogProduct>;
}

/**
 * Página de listado de catálogo (sección completa o una categoría): migas,
 * título, franja de categorías, barra de filtros y rejilla. Igual para
 * Prendas y, cuando exista, Merchandising: solo cambia la config.
 */
export function CatalogListingView({ listing, view }: CatalogListingViewProps) {
  const { section, category, collection, categories, path } = listing;
  const clearSearch = catalogQueryToString(clearFilters(view.query));

  return (
    <main className="px-4 md:px-8 pt-6 md:pt-8 pb-16 md:pb-24">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          category
            ? { label: section.label, href: section.basePath }
            : { label: section.label },
          ...(category ? [{ label: category.label }] : []),
        ]}
      />

      <header className="mt-6 md:mt-8 max-w-2xl">
        <h1 className="text-section-title text-black">{category?.label ?? section.label}</h1>
        {collection.description && (
          <p className="mt-3 text-body text-black/60">{collection.description}</p>
        )}
      </header>

      <div className="mt-6 md:mt-8 border-b border-black/10">
        <CategoryStrip
          items={[
            { label: "Todo", href: section.basePath, active: !category },
            ...categories.map((item) => ({
              label: item.label,
              href: categoryPath(section, item),
              active: item.slug === category?.slug,
            })),
          ]}
        />
      </div>

      <CatalogResults facets={view.facets} query={view.query} total={view.products.length}>
        {view.products.length > 0 ? (
          <CatalogGrid products={view.products} />
        ) : (
          <div className="py-20 text-center">
            <p className="text-body text-black">No hay productos con estos filtros.</p>
            <Link
              href={clearSearch ? `${path}?${clearSearch}` : path}
              scroll={false}
              className="mt-4 inline-block text-sm text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
            >
              Limpiar filtros
            </Link>
          </div>
        )}
      </CatalogResults>
    </main>
  );
}
