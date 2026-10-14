/**
 * Filtros de los listados de catálogo. Lógica pura (sin React ni
 * Shopify): la usan la página en servidor (para filtrar) y el panel de
 * filtros en cliente (para construir las URLs).
 *
 * El estado vive en la URL: /prendas/sudaderas?color=negro,azul&sector=restaurantes
 * - Dentro de un mismo filtro las opciones suman (negro O azul).
 * - Entre filtros distintos se restringe (color Y sector).
 * - Los valores desconocidos se ignoran: una URL vieja o manipulada nunca rompe la página.
 *
 * Se filtra en memoria sobre la colección completa: con decenas o pocos
 * cientos de productos es instantáneo. Si el catálogo creciera mucho más,
 * esta capa se cambiaría por los filtros nativos de la Storefront API sin
 * tocar páginas ni componentes.
 */
import {
  colorFamilies,
  genderOptions,
  sectorOptions,
  type FilterOption,
  type TagFilterOption,
} from "@/config/catalog";
import type { ProductSummary } from "@/types";

export type FacetKey = "color" | "sector" | "genero";

export interface CatalogQuery {
  /** Valores elegidos en cada filtro, en el orden de sus opciones. */
  filters: Record<FacetKey, string[]>;
}

export interface FacetOption extends FilterOption {
  /** Productos que quedarían al marcar esta opción (con el resto de filtros aplicados). */
  count: number;
  selected: boolean;
  /** Solo en color: muestra de la familia. */
  swatch?: string;
}

export interface Facet {
  key: FacetKey;
  label: string;
  options: FacetOption[];
}

export interface CatalogView<T extends ProductSummary = ProductSummary> {
  products: T[];
  /** Solo los filtros que tiene sentido enseñar (ver buildCatalogView). */
  facets: Facet[];
  query: CatalogQuery;
  /** Hay algún filtro activo: la URL no es la canónica. */
  isFiltered: boolean;
}

type SearchParams = Record<string, string | string[] | undefined>;

const VALUE_SEPARATOR = ",";

const colorFamilyCache = new Map<string, string | null>();

/** Familia de un nombre de color del proveedor ("Negro / Rojo" -> "negro"), o null. */
function colorFamilyOf(colorName: string): string | null {
  const cached = colorFamilyCache.get(colorName);
  if (cached !== undefined) return cached;

  const primary = colorName.split("/")[0].trim().toLowerCase();
  const family =
    colorFamilies.find(({ prefixes }) => prefixes.some((prefix) => primary.startsWith(prefix)))
      ?.value ?? null;
  colorFamilyCache.set(colorName, family);
  return family;
}

function tagValues(options: TagFilterOption[], product: ProductSummary): string[] {
  return options.filter(({ tag }) => product.tags.includes(tag)).map(({ value }) => value);
}

interface FacetDefinition {
  key: FacetKey;
  label: string;
  options: Array<FilterOption & { swatch?: string }>;
  /** Valores de este filtro que cumple un producto. */
  valuesOf: (product: ProductSummary) => string[];
}

/** Orden en que se muestran los filtros (y se escriben en la URL). */
const FACETS: FacetDefinition[] = [
  {
    key: "color",
    label: "Color",
    options: colorFamilies.map(({ value, label, swatch }) => ({ value, label, swatch })),
    valuesOf: (product) => [
      ...new Set(product.colors.map(colorFamilyOf).filter((family) => family !== null)),
    ],
  },
  {
    key: "sector",
    label: "Sector",
    options: sectorOptions,
    valuesOf: (product) => tagValues(sectorOptions, product),
  },
  {
    key: "genero",
    label: "Género",
    options: genderOptions,
    valuesOf: (product) => tagValues(genderOptions, product),
  },
];

function emptyFilters(): Record<FacetKey, string[]> {
  return { color: [], sector: [], genero: [] };
}

function firstParam(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** Lee la URL y descarta lo que no sea una opción válida. */
export function parseCatalogQuery(params: SearchParams): CatalogQuery {
  const filters = emptyFilters();
  for (const { key, options } of FACETS) {
    const requested = new Set(firstParam(params[key]).split(VALUE_SEPARATOR));
    // Se recorre la lista de opciones (no la URL) para dejar los valores en
    // un orden fijo y sin duplicados.
    filters[key] = options.map(({ value }) => value).filter((value) => requested.has(value));
  }

  return { filters };
}

/** Query string (sin "?") de un estado de filtros; "" si no hay ninguno. */
export function catalogQueryToString({ filters }: CatalogQuery): string {
  const params = new URLSearchParams();
  for (const { key } of FACETS) {
    if (filters[key].length > 0) params.set(key, filters[key].join(VALUE_SEPARATOR));
  }
  // URLSearchParams escapa la coma (%2C); se deja legible, es válida en una query.
  return params.toString().replaceAll("%2C", VALUE_SEPARATOR);
}

/** Marca o desmarca una opción de un filtro. */
export function toggleFilter(query: CatalogQuery, key: FacetKey, value: string): CatalogQuery {
  const current = query.filters[key];
  const selected = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  // Se reordena según las opciones para que la URL no dependa del orden de clic.
  const options = FACETS.find((facet) => facet.key === key)?.options ?? [];
  const ordered = options.map((option) => option.value).filter((item) => selected.includes(item));
  return { ...query, filters: { ...query.filters, [key]: ordered } };
}

/** Quita todos los filtros. */
export function clearFilters(query: CatalogQuery): CatalogQuery {
  return { ...query, filters: emptyFilters() };
}

/**
 * Aplica los filtros a los productos de una colección (que conservan el orden
 * de la colección en el admin) y calcula qué filtros enseñar y con qué recuentos.
 *
 * Recuentos "disyuntivos" (los de Zara, Nude…): el número de cada opción de
 * Color se calcula con el resto de filtros aplicados pero SIN el propio
 * Color, para que marcar una segunda opción muestre cuántos SUMARÍA.
 *
 * Se ocultan las opciones con 0 productos (salvo si están marcadas) y los
 * filtros con menos de 2 opciones: un filtro de una sola opción no filtra.
 * Por eso Género aparece solo cuando existan las etiquetas.
 */
export function buildCatalogView<T extends ProductSummary>(
  products: T[],
  query: CatalogQuery
): CatalogView<T> {
  const valuesByProduct = products.map((product) => {
    const values = {} as Record<FacetKey, Set<string>>;
    for (const { key, valuesOf } of FACETS) values[key] = new Set(valuesOf(product));
    return values;
  });

  /** ¿El producto i cumple todos los filtros activos, salvo `except`? */
  const matches = (index: number, except?: FacetKey) =>
    FACETS.every(({ key }) => {
      const selected = query.filters[key];
      if (key === except || selected.length === 0) return true;
      return selected.some((value) => valuesByProduct[index][key].has(value));
    });

  const facets: Facet[] = FACETS.flatMap(({ key, label, options }) => {
    const counts = new Map<string, number>();
    products.forEach((_, index) => {
      if (!matches(index, key)) return;
      for (const value of valuesByProduct[index][key]) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }
    });

    const facetOptions = options
      .map((option) => ({
        ...option,
        count: counts.get(option.value) ?? 0,
        selected: query.filters[key].includes(option.value),
      }))
      .filter(({ count, selected }) => count > 0 || selected);

    const hasSelection = facetOptions.some(({ selected }) => selected);
    return facetOptions.length >= 2 || hasSelection ? [{ key, label, options: facetOptions }] : [];
  });

  return {
    products: products.filter((_, index) => matches(index)),
    facets,
    query,
    isFiltered: isFilteredQuery(query),
  };
}

/** ¿Hay algún filtro activo? (Entonces la URL no es la canónica.) */
export function isFilteredQuery({ filters }: CatalogQuery): boolean {
  return FACETS.some(({ key }) => filters[key].length > 0);
}
