import type {
  CartCustomization,
  CartLine,
  PriceTier,
  ProductImage,
} from "@/types";

/**
 * Persistencia del carrito en localStorage.
 *
 * La clave lleva versión: si el día de mañana cambia la forma de CartLine,
 * se sube a v2 y los carritos antiguos simplemente se descartan (no hay
 * migración que valga la pena para un carrito).
 *
 * Todo lo que se lee de localStorage se valida campo a campo antes de
 * devolverlo: es un dato externo que el usuario (o una versión antigua de la
 * web) puede haber dejado en cualquier estado. Ante datos corruptos se
 * devuelve un carrito vacío, nunca se lanza.
 */

const STORAGE_KEY = "plasmalo:cart:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isProductImage(value: unknown): value is ProductImage {
  return (
    isRecord(value) &&
    typeof value.url === "string" &&
    (value.altText === null || typeof value.altText === "string") &&
    typeof value.width === "number" &&
    typeof value.height === "number"
  );
}

function isPriceTier(value: unknown): value is PriceTier {
  return (
    isRecord(value) &&
    typeof value.minQuantity === "number" &&
    typeof value.unitPrice === "number"
  );
}

function isCustomization(value: unknown): value is CartCustomization {
  return (
    isRecord(value) &&
    typeof value.zone === "string" &&
    typeof value.unitPrice === "number"
  );
}

function isSelectedOptions(value: unknown): value is Record<string, string> {
  return (
    isRecord(value) &&
    Object.values(value).every((option) => typeof option === "string")
  );
}

function isCartLine(value: unknown): value is CartLine {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.productHandle === "string" &&
    typeof value.productTitle === "string" &&
    typeof value.variantId === "string" &&
    isSelectedOptions(value.selectedOptions) &&
    (value.image === null || isProductImage(value.image)) &&
    typeof value.quantity === "number" &&
    value.quantity >= 1 &&
    Array.isArray(value.customizations) &&
    value.customizations.every(isCustomization) &&
    Array.isArray(value.priceTiers) &&
    value.priceTiers.length > 0 &&
    value.priceTiers.every(isPriceTier) &&
    (value.designFileName === null ||
      typeof value.designFileName === "string") &&
    typeof value.notes === "string"
  );
}

export function loadCartLines(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isCartLine)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveCartLines(lines: CartLine[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // localStorage lleno o bloqueado (modo privado): el carrito sigue
    // funcionando en memoria, solo se pierde la persistencia.
  }
}
