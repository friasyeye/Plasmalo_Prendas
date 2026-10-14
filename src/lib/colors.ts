import { colorSwatches } from "@/config/colors";

/**
 * Valor CSS de `background` para el círculo/cuadrado de un color, o null si el
 * color no tiene muestra (entonces se pinta con la foto). Los bicolor se
 * pintan partidos por la mitad.
 */
export function swatchBackground(colorName: string): string | null {
  const hex = colorSwatches[colorName];
  if (!hex) return null;
  const [first, second] = hex.split(",");
  return second ? `linear-gradient(90deg, ${first} 50%, ${second} 50%)` : first;
}
