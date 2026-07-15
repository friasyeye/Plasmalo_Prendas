import type { PriceTier } from "@/types";

/**
 * Cálculo de precios por tramos de cantidad.
 *
 * Funciones PURAS: no hacen fetch, no leen process.env, no saben que React
 * existe. Entra (tramos, cantidad), sale un número. Eso las hace triviales
 * de testear de forma aislada, que es lo que toca con la lógica más
 * delicada del negocio.
 *
 * Modelo de precio de Plásmalo:
 *   total = (precio unitario de la prenda según el tramo de cantidad
 *            + precio fijo de la personalización) × cantidad
 *
 * Las tablas de tramos vienen de metaobjects de Shopify (una por tipo de
 * producto) y llegan aquí ya traducidas a PriceTier[] por lib/shopify.
 */

/**
 * Devuelve el precio unitario que corresponde a una cantidad, buscando el
 * tramo más alto cuyo minQuantity sea <= quantity.
 *
 * Ejemplo: con tramos [{min 1, 12€}, {min 10, 9€}, {min 50, 7€}]
 *   quantity 5  → 12€ · quantity 10 → 9€ · quantity 120 → 7€
 */
export function getUnitPriceForQuantity(
  tiers: PriceTier[],
  quantity: number
): number {
  if (quantity < 1) {
    throw new Error(`La cantidad debe ser >= 1 (recibido: ${quantity})`);
  }
  if (tiers.length === 0) {
    throw new Error("La tabla de tramos está vacía");
  }

  const applicable = [...tiers]
    .sort((a, b) => a.minQuantity - b.minQuantity)
    .filter((tier) => tier.minQuantity <= quantity);

  if (applicable.length === 0) {
    throw new Error(
      `Ningún tramo aplica a la cantidad ${quantity} (el tramo más bajo empieza en ${tiers[0].minQuantity})`
    );
  }

  return applicable[applicable.length - 1].unitPrice;
}

/**
 * Ahorro por alcanzar el siguiente tramo de precio.
 *
 * savings es el ahorro EN DINERO sobre el pedido completo (manual de pricing,
 * punto 2: dinero, nunca porcentajes): comprar nextTier.minQuantity unidades
 * al precio del tramo siguiente frente a comprarlas al precio actual.
 *
 * La personalización no entra en el cálculo: es un coste fijo por unidad que
 * aparece igual en ambos escenarios y se cancela. Por eso el mismo helper vale
 * para una sola línea (configurador) y para las unidades agregadas de un
 * producto con personalizaciones distintas por línea (carrito).
 */
export interface NextTierSavings {
  /** Unidades que faltan para entrar en el siguiente tramo. */
  unitsNeeded: number;
  /** Ahorro en euros sobre el pedido completo al alcanzarlo. */
  savings: number;
}

export function getNextTierSavings(
  tiers: PriceTier[],
  quantity: number
): NextTierSavings | null {
  const sorted = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);
  const nextTier = sorted.find((tier) => tier.minQuantity > quantity);
  if (!nextTier) return null;

  const currentUnitPrice = getUnitPriceForQuantity(sorted, quantity);
  const savings = (currentUnitPrice - nextTier.unitPrice) * nextTier.minQuantity;
  if (savings <= 0) return null;

  return { unitsNeeded: nextTier.minQuantity - quantity, savings };
}

/**
 * Redondea un importe a céntimos (2 decimales). Los precios con IVA se
 * redondean POR UNIDAD antes de multiplicar por la cantidad, porque así es
 * como cobra Shopify (el priceOverride del checkout es un precio unitario
 * con 2 decimales): redondear igual aquí garantiza que la web y el checkout
 * muestran exactamente el mismo total.
 */
export function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * Precio total de un pedido: prenda según tramo + personalización fija,
 * multiplicado por la cantidad.
 */
export function calculateOrderTotal(options: {
  tiers: PriceTier[];
  quantity: number;
  /** Precio fijo por unidad de la personalización (DTF, bordado…). */
  customizationUnitPrice: number;
}): number {
  const { tiers, quantity, customizationUnitPrice } = options;
  const unitPrice = getUnitPriceForQuantity(tiers, quantity);
  return (unitPrice + customizationUnitPrice) * quantity;
}
