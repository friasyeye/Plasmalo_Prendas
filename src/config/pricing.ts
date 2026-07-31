/**
 * Personalizaciones disponibles para la Camiseta.
 *
 * TEMPORAL: hardcodeado mientras se enlaza el metaobjeto "Personalización"
 * al producto (mismo patrón ya aplicado a los tramos de precio, ver
 * src/lib/shopify/adapters.ts → toProduct). Cuando se enlace, esto se
 * sustituirá por una lectura real vía lib/shopify.
 */

export interface Customization {
  zone: string;
  unitPrice: number;
  image: string;
}

export const camisetaCustomizations: Customization[] = [
  { zone: "Escudo", unitPrice: 1.0, image: "/images/escudo-01-01-01.png" },
  { zone: "Frontal", unitPrice: 2.1, image: "/images/delante-01.jpg" },
  { zone: "Espalda", unitPrice: 2.1, image: "/images/espalda-01-01.png" },
  { zone: "Manga", unitPrice: 1.0, image: "/images/manga-01-01-01.png" },
];

export const IVA_RATE = 0.21;

/**
 * Composición, estilo y cuidado de la Camiseta.
 *
 * TEMPORAL: contenido de ejemplo. Sustituir por los datos reales del
 * producto (idealmente vía metafield de Shopify, mismo patrón que
 * camisetaCustomizations) antes de lanzar.
 */
export interface ProductDetailSection {
  title: string;
  items: string[];
}

export const camisetaDetails: ProductDetailSection[] = [
  {
    title: "Composición",
    items: ["100% algodón peinado", "180 g/m²", "Punto jersey"],
  },
  {
    title: "Estilo",
    items: ["Corte regular", "Cuello redondo reforzado", "Costuras dobles"],
  },
  {
    title: "Cuidado",
    items: [
      "Lavar a máquina a 30°C",
      "No usar lejía",
      "Secar a la sombra",
      "Planchar a temperatura media",
    ],
  },
];
