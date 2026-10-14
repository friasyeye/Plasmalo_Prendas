"use client";

import type { ReactNode, Ref } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogQuery, Facet, FacetKey } from "@/lib/catalog/filters";

interface FilterDrawerProps {
  facets: Facet[];
  /** Estado mostrado (optimista: ya incluye el último clic aunque la página no haya llegado). */
  query: CatalogQuery;
  total: number;
  onToggle: (key: FacetKey, value: string) => void;
  onClear: () => void;
  onClose: () => void;
  ref: Ref<HTMLDialogElement>;
}

/** Opción seleccionable: subrayada si está activa (mismo estilo que Talla en la ficha). */
function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 py-1.5 text-left text-sm transition-colors",
        selected ? "text-black" : "text-black/60 hover:text-black"
      )}
    >
      {children}
    </button>
  );
}

/**
 * Panel lateral de filtros. Es un <dialog> nativo abierto con
 * showModal(): el navegador ya da foco atrapado dentro, cierre con Escape y
 * el resto de la página inerte (accesible sin código propio).
 *
 * Los cambios se aplican al momento (estilo Zara/Nude); "Ver N productos"
 * solo cierra el panel.
 */
export function FilterDrawer({
  facets,
  query,
  total,
  onToggle,
  onClear,
  onClose,
  ref,
}: FilterDrawerProps) {
  const hasFilters = Object.values(query.filters).some((values) => values.length > 0);

  return (
    <dialog
      ref={ref}
      aria-labelledby="filter-drawer-title"
      // Clic en el fondo oscuro (fuera del panel) = cerrar.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md p-0 bg-white backdrop:bg-black/40",
        // Entra y sale deslizando desde la derecha (donde el navegador lo soporta).
        "translate-x-full open:translate-x-0 starting:open:translate-x-full transition-[translate,display,overlay] duration-300 transition-discrete"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/10 px-5">
          <h2 id="filter-drawer-title" className="text-nav text-black">
            Filtrar
          </h2>
          <button
            type="button"
            aria-label="Cerrar filtros"
            onClick={onClose}
            className="text-black hover:opacity-70 transition-opacity"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {facets.map(({ key, label, options }) => (
            <fieldset key={key} className="border-b border-black/10 py-5 last:border-b-0">
              <legend className="float-left mb-2 w-full text-caption uppercase tracking-[0.08em] text-black/50">
                {label}
              </legend>
              <div className={cn("clear-left", key === "color" ? "grid grid-cols-2 gap-x-4" : "flex flex-col")}>
                {options.map((option) => {
                  const selected = query.filters[key].includes(option.value);
                  return (
                    <OptionButton
                      key={option.value}
                      selected={selected}
                      onClick={() => onToggle(key, option.value)}
                    >
                      {option.swatch && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-3.5 w-3.5 shrink-0 border",
                            selected ? "border-black" : "border-black/15"
                          )}
                          style={{ background: option.swatch }}
                        />
                      )}
                      <span>
                        <span className={cn(selected && "underline underline-offset-4")}>
                          {option.label}
                        </span>
                        <span className="ml-1 text-black/40">({option.count})</span>
                      </span>
                    </OptionButton>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-black/10 px-5 py-4">
          <button
            type="button"
            onClick={onClear}
            disabled={!hasFilters}
            className="text-sm text-black underline underline-offset-4 decoration-black/30 hover:decoration-black disabled:text-black/30 disabled:no-underline transition-colors"
          >
            Limpiar filtros
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-black/80 hover:bg-black/80"
          >
            Ver {total} {total === 1 ? "producto" : "productos"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
