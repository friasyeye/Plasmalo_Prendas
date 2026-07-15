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
