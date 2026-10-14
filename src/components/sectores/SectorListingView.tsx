import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import type { SectorPage } from "@/lib/catalog/sector";
import type { CatalogProduct } from "@/types";

interface SectorListingViewProps {
  sector: SectorPage;
  products: CatalogProduct[];
}

/**
 * Página de un sector: migas, título y prendas del sector. Misma estructura
 * que un listado de /prendas, sin franja ni filtros: quien llega ya eligió su
 * sector.
 */
export function SectorListingView({ sector, products }: SectorListingViewProps) {
  return (
    <main className="px-4 md:px-8 pt-6 md:pt-8 pb-16 md:pb-24">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Sectores", href: "/sectores" },
          { label: sector.name },
        ]}
      />

      <header className="mt-6 md:mt-8 max-w-2xl">
        <h1 className="text-section-title text-black">{sector.title}</h1>
        <p className="mt-3 text-body text-black/60">{sector.description}</p>
      </header>

      {products.length > 0 && (
        <div className="mt-8 md:mt-10">
          <CatalogGrid products={products} />
        </div>
      )}
    </main>
  );
}
