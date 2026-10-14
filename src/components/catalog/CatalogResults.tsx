"use client";

import { useOptimistic, useRef, useTransition } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  catalogQueryToString,
  clearFilters,
  toggleFilter,
  type CatalogQuery,
  type Facet,
  type FacetKey,
} from "@/lib/catalog/filters";
import { FilterDrawer } from "./FilterDrawer";

interface CatalogResultsProps {
  facets: Facet[];
  query: CatalogQuery;
  total: number;
  /** La rejilla de productos, pintada en servidor. */
  children: ReactNode;
}

/**
 * Barra de resultados (número de productos, filtros activos, botón de
 * filtros) + panel de filtros, envolviendo la rejilla.
 *
 * Cada cambio reescribe la URL (router.replace: los filtros no llenan el
 * historial del botón atrás) y el servidor devuelve la página ya filtrada.
 * Mientras llega, la rejilla se atenúa, y `useOptimistic` marca el filtro
 * al instante para que el clic no parezca ignorado.
 */
export function CatalogResults({ facets, query, total, children }: CatalogResultsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [shownQuery, setShownQuery] = useOptimistic(query);

  function navigate(next: CatalogQuery) {
    startTransition(() => {
      setShownQuery(next);
      const search = catalogQueryToString(next);
      router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
    });
  }

  const handleToggle = (key: FacetKey, value: string) =>
    navigate(toggleFilter(shownQuery, key, value));
  const handleClear = () => navigate(clearFilters(shownQuery));

  // Filtros activos como etiquetas, en el orden de los filtros y sus opciones.
  const activeTags = facets.flatMap(({ key, options }) =>
    options
      .filter(({ value }) => shownQuery.filters[key].includes(value))
      .map(({ value, label }) => ({ key, value, label }))
  );

  return (
    <>
      <div className="flex items-center justify-between gap-4 py-4">
        <p className="text-caption text-black/50" aria-live="polite">
          {total} {total === 1 ? "producto" : "productos"}
        </p>
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="flex items-center gap-2 text-nav text-black hover:opacity-70 transition-opacity"
        >
          <SlidersHorizontal size={16} strokeWidth={1.75} />
          Filtrar
          {activeTags.length > 0 && <span className="text-black/50">({activeTags.length})</span>}
        </button>
      </div>

      {activeTags.length > 0 && (
        <ul className="flex flex-wrap items-center gap-2 pb-4">
          {activeTags.map(({ key, value, label }) => (
            <li key={`${key}-${value}`}>
              <button
                type="button"
                onClick={() => handleToggle(key, value)}
                aria-label={`Quitar filtro ${label}`}
                className="flex items-center gap-1.5 border border-black/15 px-3 py-1.5 text-xs text-black hover:border-black transition-colors"
              >
                {label}
                <X size={12} />
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={handleClear}
              className="px-1 text-xs text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
            >
              Limpiar todo
            </button>
          </li>
        </ul>
      )}

      <div
        aria-busy={isPending}
        className={cn("transition-opacity duration-200", isPending && "opacity-50")}
      >
        {children}
      </div>

      <FilterDrawer
        ref={dialogRef}
        facets={facets}
        query={shownQuery}
        total={total}
        onToggle={handleToggle}
        onClear={handleClear}
        onClose={() => dialogRef.current?.close()}
      />
    </>
  );
}
