/**
 * Catálogo: secciones (Prendas; Merchandising cuando exista), sus categorías
 * y las opciones de los filtros. Solo datos: la lógica vive en lib/catalog.
 *
 * Qué productos entran en cada categoría NO se decide aquí: cada categoría es
 * una colección inteligente de Shopify (reglas por tipo de producto, ver
 * docs/catalogo.md). Aquí solo se fija su URL, su nombre y el orden de la
 * franja. Una categoría cuya colección no tenga productos no se muestra.
 */
import { sectors } from "@/config/home";

export interface CatalogCategory {
  /** Segmento de la URL: /prendas/[slug]. */
  slug: string;
  label: string;
  /** Handle de la colección de Shopify con sus productos. */
  collection: string;
}

export interface CatalogSection {
  label: string;
  /** Ruta del listado completo, p. ej. "/prendas". */
  basePath: string;
  /** Colección de Shopify con TODOS los productos de la sección. */
  collection: string;
  /** En el orden de la franja de categorías. */
  categories: CatalogCategory[];
}

export const prendasSection: CatalogSection = {
  label: "Prendas",
  basePath: "/prendas",
  collection: "prendas",
  // Orden de temporada (invierno): abrigo primero.
  categories: [
    { slug: "sudaderas", label: "Sudaderas", collection: "sudaderas" },
    { slug: "chaquetas", label: "Chaquetas", collection: "chaquetas" },
    { slug: "camisetas", label: "Camisetas", collection: "camisetas" },
    { slug: "polos", label: "Polos", collection: "polos" },
    { slug: "camisas", label: "Camisas", collection: "camisas" },
    { slug: "pantalones", label: "Pantalones", collection: "pantalones" },
    { slug: "gorras", label: "Gorras", collection: "gorras" },
    { slug: "accesorios", label: "Accesorios", collection: "accesorios" },
  ],
};

/**
 * Todas las secciones. La URL de un producto es la de la PRIMERA categoría (en
 * este orden de secciones y de categorías) cuya colección lo contiene.
 */
export const catalogSections: CatalogSection[] = [prendasSection];

/** Una opción de filtro: `value` va en la URL, `label` se muestra. */
export interface FilterOption {
  value: string;
  label: string;
}

/**
 * Familia de color del filtro. Los colores del proveedor (~90 nombres) se
 * agrupan por el PRINCIPIO del nombre de su color principal (en un bicolor
 * "Negro / Rojo", el primero). Gana la PRIMERA familia que encaje, por eso
 * las específicas ("azul marino") van antes que las genéricas ("azul").
 * Un color que no encaje en ninguna simplemente no aparece en el filtro.
 */
export interface ColorFamily extends FilterOption {
  /** Color de la muestra en el filtro. */
  swatch: string;
  /** Principios de nombre, en minúsculas. */
  prefixes: string[];
}

export const colorFamilies: ColorFamily[] = [
  { value: "negro", label: "Negro", swatch: "#000000", prefixes: ["negro"] },
  { value: "blanco", label: "Blanco", swatch: "#ffffff", prefixes: ["blanco"] },
  {
    value: "gris",
    label: "Gris",
    swatch: "#989893",
    prefixes: ["gris", "antracita", "grafito", "zinc", "ash"],
  },
  {
    value: "azul-marino",
    label: "Azul marino",
    swatch: "#142434",
    prefixes: ["azul marino", "french marino", "azul oscuro", "azul petróleo", "denim"],
  },
  {
    value: "azul",
    label: "Azul",
    swatch: "#0057a4",
    prefixes: ["azul", "ultramarino", "aqua", "turquesa", "cielo"],
  },
  { value: "rojo", label: "Rojo", swatch: "#f60001", prefixes: ["rojo", "burdeos"] },
  {
    value: "verde",
    label: "Verde",
    swatch: "#009c53",
    prefixes: ["verde", "esmeralda", "lima", "tilo", "caqui", "army"],
  },
  { value: "amarillo", label: "Amarillo", swatch: "#ffc100", prefixes: ["amarillo", "limón"] },
  { value: "naranja", label: "Naranja", swatch: "#fe8d00", prefixes: ["naranja", "albaricoque"] },
  { value: "rosa", label: "Rosa", swatch: "#ff6aa7", prefixes: ["rosa", "neón coral"] },
  { value: "morado", label: "Morado", swatch: "#643e95", prefixes: ["morado", "astral"] },
  { value: "marron", label: "Marrón", swatch: "#885d4a", prefixes: ["marrón", "chocolate", "tierra"] },
  {
    value: "beige",
    label: "Beige",
    swatch: "#e3cea1",
    prefixes: ["beige", "arena", "cuerda", "lino", "natural"],
  },
];

/** Opción que se cumple si el producto lleva esa etiqueta de Shopify. */
export interface TagFilterOption extends FilterOption {
  tag: string;
}

/** Sectores: mismas etiquetas que pone el CSV y mismo slug que /sectores/[slug]. */
export const sectorOptions: TagFilterOption[] = sectors.map(({ slug, name }) => ({
  value: slug,
  label: name,
  tag: name,
}));

/**
 * Etiqueta de Shopify de las prendas unisex: activa el filtro "Unisex" y el
 * badge de la tarjeta. La pone el generador del CSV a partir del feed.
 */
export const UNISEX_TAG = "Unisex";

/**
 * Género: etiquetas que pone el generador del CSV (columna Gender del feed).
 * Una prenda unisex lleva las tres, así sale al filtrar por cualquiera.
 * Sin etiquetas, el filtro no sale.
 */
export const genderOptions: TagFilterOption[] = [
  { value: "hombre", label: "Hombre", tag: "Hombre" },
  { value: "mujer", label: "Mujer", tag: "Mujer" },
  { value: "unisex", label: "Unisex", tag: UNISEX_TAG },
];
