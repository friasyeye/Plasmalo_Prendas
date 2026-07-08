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
}

export const camisetaCustomizations: Customization[] = [
  { zone: "Escudo", unitPrice: 1.0 },
  { zone: "Frontal", unitPrice: 2.1 },
  { zone: "Espalda", unitPrice: 2.1 },
  { zone: "Manga", unitPrice: 1.0 },
];

export const IVA_RATE = 0.21;
