import type { CartLine } from "@/types";
import {
  getUnitPriceForQuantity,
  getNextTierSavings,
  roundToCents,
  type NextTierSavings,
} from "@/lib/pricing/tiered-pricing";
import { IVA_RATE } from "@/config/pricing";

/**
 * Operaciones y cálculo de precios del carrito.
 *
 * Funciones PURAS, igual que lib/pricing: entra un CartLine[], sale otro
 * CartLine[] nuevo o una estructura de precios. Nada de React, localStorage
 * ni fetch — eso vive en cart-storage.ts y en el hook useCart.
 *
 * Regla de negocio central (confirmada con el cliente):
 * el tramo de descuento se calcula POR PRODUCTO, sumando las unidades de
 * todas las variantes (color/talla) de ese producto en el pedido. 5 Regent
 * rojas + 20 Regent azules = 25 uds → ambas líneas pagan la prenda al tramo
 * 25-49. La personalización, en cambio, es específica de cada línea.
 */

/**
 * Identidad de una línea: misma variante + mismas zonas de personalización
 * (el orden de selección no importa) → misma línea. Añadir una combinación
 * ya existente fusiona cantidades en vez de duplicar líneas.
 */
export function buildLineId(variantId: string, zones: string[]): string {
  return `${variantId}::${[...zones].sort().join("|")}`;
}

function mergeNotes(existing: string, incoming: string): string {
  if (!incoming || incoming === existing) return existing;
  if (!existing) return incoming;
  return `${existing} · ${incoming}`;
}

/** Añade una línea; si ya existe una idéntica (mismo id), suma cantidades. */
export function addLine(lines: CartLine[], incoming: CartLine): CartLine[] {
  const existing = lines.find((line) => line.id === incoming.id);
  if (!existing) return [...lines, incoming];

  return lines.map((line) =>
    line.id === incoming.id
      ? {
          ...line,
          quantity: line.quantity + incoming.quantity,
          // La tabla de tramos y el diseño más recientes ganan.
          priceTiers: incoming.priceTiers,
          designFileName: incoming.designFileName ?? line.designFileName,
          notes: mergeNotes(line.notes, incoming.notes),
        }
      : line
  );
}

/** Talla primero y Color después: "10 S Negro", como se pide un pedido en voz alta. */
export function formatLineSummary(line: CartLine): string {
  const entries = Object.entries(line.selectedOptions);
  const size = entries.find(([name]) => /talla|size/i.test(name));
  const color = entries.find(([name]) => /color|colour/i.test(name));
  const rest = entries.filter(([name]) => name !== size?.[0] && name !== color?.[0]);

  const label = [size, color, ...rest]
    .filter((entry): entry is [string, string] => Boolean(entry))
    .map(([, value]) => value)
    .join(" ");

  return `${line.quantity} ${label}`.trim();
}

export function removeLine(lines: CartLine[], lineId: string): CartLine[] {
  return lines.filter((line) => line.id !== lineId);
}

/** Fija la cantidad de una línea (mínimo 1; para quitar, removeLine). */
export function setLineQuantity(
  lines: CartLine[],
  lineId: string,
  quantity: number
): CartLine[] {
  const safeQuantity = Math.max(1, Math.floor(quantity) || 1);
  return lines.map((line) =>
    line.id === lineId ? { ...line, quantity: safeQuantity } : line
  );
}

/** Precios de UNA línea, ya con el tramo agregado del producto aplicado. */
export interface CartLinePricing {
  /** Precio de la prenda según el tramo de las unidades agregadas del producto. */
  garmentUnitPrice: number;
  /** Suma fija de las zonas de personalización de esta línea. */
  customizationUnitPrice: number;
  /** garmentUnitPrice + customizationUnitPrice. */
  unitTotal: number;
  /**
   * unitTotal con IVA, redondeado a céntimos POR UNIDAD: es el importe
   * exacto que cobra el checkout de Shopify (priceOverride unitario).
   */
  unitTotalWithIva: number;
  /** unitTotal × quantity, sin IVA. */
  lineTotal: number;
}

/** Las líneas de un mismo producto, con sus unidades agregadas y su ahorro. */
export interface CartProductGroup {
  productHandle: string;
  productTitle: string;
  lines: CartLine[];
  /** Unidades de TODAS las variantes del producto — decide el tramo. */
  quantity: number;
  /** "Añade N más y ahorrarás X€" calculado sobre las unidades agregadas. */
  savings: NextTierSavings | null;
}

export interface CartPricing {
  groups: CartProductGroup[];
  /** Precios por línea, indexados por CartLine.id. */
  linePricing: Record<string, CartLinePricing>;
  totalUnits: number;
  /** Total del pedido sin IVA. */
  subtotal: number;
  totalWithIva: number;
}

/**
 * Calcula todos los precios del carrito. Es la extensión a varias líneas del
 * cálculo del configurador: mismo modelo (prenda por tramo + personalización
 * fija), con la cantidad del tramo agregada por producto.
 */
export function computeCartPricing(lines: CartLine[]): CartPricing {
  // 1. Agrupar por producto conservando el orden de inserción.
  const groups: CartProductGroup[] = [];
  for (const line of lines) {
    const group = groups.find((g) => g.productHandle === line.productHandle);
    if (group) {
      group.lines.push(line);
      group.quantity += line.quantity;
    } else {
      groups.push({
        productHandle: line.productHandle,
        productTitle: line.productTitle,
        lines: [line],
        quantity: line.quantity,
        savings: null,
      });
    }
  }

  // 2. Con las unidades agregadas ya conocidas, poner precio a cada línea.
  const linePricing: Record<string, CartLinePricing> = {};
  let totalUnits = 0;
  let subtotal = 0;
  let totalWithIva = 0;

  for (const group of groups) {
    const tiers = group.lines[0].priceTiers;
    const garmentUnitPrice = getUnitPriceForQuantity(tiers, group.quantity);
    group.savings = getNextTierSavings(tiers, group.quantity);

    for (const line of group.lines) {
      const customizationUnitPrice = line.customizations.reduce(
        (sum, c) => sum + c.unitPrice,
        0
      );
      const unitTotal = garmentUnitPrice + customizationUnitPrice;
      // El IVA se redondea por unidad, igual que lo cobra Shopify (ver
      // roundToCents): el total con IVA del drawer y el del checkout
      // coinciden céntimo a céntimo.
      const unitTotalWithIva = roundToCents(unitTotal * (1 + IVA_RATE));
      const lineTotal = unitTotal * line.quantity;
      linePricing[line.id] = {
        garmentUnitPrice,
        customizationUnitPrice,
        unitTotal,
        unitTotalWithIva,
        lineTotal,
      };
      totalUnits += line.quantity;
      subtotal += lineTotal;
      totalWithIva += unitTotalWithIva * line.quantity;
    }
  }

  return {
    groups,
    linePricing,
    totalUnits,
    subtotal,
    totalWithIva,
  };
}
