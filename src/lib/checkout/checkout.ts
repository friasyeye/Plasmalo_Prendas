import type { CartLine, Product } from "@/types";
import type { Customization } from "@/config/pricing";
import { buildLineId, computeCartPricing } from "@/lib/cart/cart";
import type { ShopifyDraftOrderInput } from "@/lib/shopify/types";

/**
 * Lógica PURA del checkout (sin fetch, sin Next.js): validar el payload que
 * manda el navegador y construir el input de draftOrderCreate.
 *
 * Principio de seguridad: el navegador NUNCA manda precios. Solo manda
 * referencias (handle, variantId, zonas) y cantidades; el servidor busca los
 * datos reales en Shopify y en config/pricing y recalcula todo con la misma
 * función que usa el drawer (computeCartPricing). Un payload manipulado no
 * puede alterar un precio: como mucho consigue un error de validación.
 */

/** Una línea tal y como la manda el navegador: referencias, nunca precios. */
export interface CheckoutLineInput {
  productHandle: string;
  variantId: string;
  quantity: number;
  /** Zonas de personalización por nombre; el precio lo pone el servidor. */
  zones: string[];
  designFileName: string | null;
  notes: string;
}

/** Resultado de una validación: o el valor, o un mensaje mostrable al usuario. */
export type CheckoutResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

/* Topes de sanidad: muy por encima de cualquier pedido real, pero impiden
   que un payload malicioso dispare trabajo o pedidos absurdos. */
const MAX_LINES = 50;
const MAX_TOTAL_UNITS = 10_000;
const MAX_TEXT_LENGTH = 1_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCheckoutLineInput(value: unknown): value is CheckoutLineInput {
  return (
    isRecord(value) &&
    typeof value.productHandle === "string" &&
    value.productHandle.length > 0 &&
    typeof value.variantId === "string" &&
    value.variantId.length > 0 &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity >= 1 &&
    Array.isArray(value.zones) &&
    value.zones.every((zone) => typeof zone === "string") &&
    (value.designFileName === null ||
      (typeof value.designFileName === "string" &&
        value.designFileName.length <= MAX_TEXT_LENGTH)) &&
    typeof value.notes === "string" &&
    value.notes.length <= MAX_TEXT_LENGTH
  );
}

/** Valida la forma del body del POST /api/checkout: { lines: [...] }. */
export function parseCheckoutPayload(
  body: unknown
): CheckoutResult<CheckoutLineInput[]> {
  if (!isRecord(body) || !Array.isArray(body.lines)) {
    return { ok: false, error: "El pedido recibido no es válido." };
  }
  if (body.lines.length === 0) {
    return { ok: false, error: "El pedido está vacío." };
  }
  if (body.lines.length > MAX_LINES) {
    return { ok: false, error: "El pedido tiene demasiadas líneas." };
  }
  if (!body.lines.every(isCheckoutLineInput)) {
    return { ok: false, error: "El pedido recibido no es válido." };
  }

  const totalUnits = body.lines.reduce((sum, line) => sum + line.quantity, 0);
  if (totalUnits > MAX_TOTAL_UNITS) {
    return { ok: false, error: "El pedido supera el máximo de unidades." };
  }

  return { ok: true, value: body.lines };
}

/**
 * Cruza cada línea del payload con los datos REALES (producto de Shopify y
 * personalizaciones del servidor) y reconstruye las CartLine con las que
 * computeCartPricing pondrá los precios. Cualquier referencia que no exista
 * (producto, variante, zona) corta el checkout con un error claro.
 */
export function buildCartLinesFromPayload(
  inputs: CheckoutLineInput[],
  productsByHandle: ReadonlyMap<string, Product>,
  customizations: Customization[]
): CheckoutResult<CartLine[]> {
  const lines: CartLine[] = [];

  for (const input of inputs) {
    const product = productsByHandle.get(input.productHandle);
    if (!product || product.priceTiers.length === 0) {
      return {
        ok: false,
        error: `El producto "${input.productHandle}" ya no está disponible.`,
      };
    }

    const variant = product.variants.find((v) => v.id === input.variantId);
    if (!variant || !variant.availableForSale) {
      return {
        ok: false,
        error: `Una variante de "${product.title}" ya no está disponible.`,
      };
    }

    const uniqueZones = [...new Set(input.zones)];
    const lineCustomizations = [];
    for (const zone of uniqueZones) {
      const customization = customizations.find((c) => c.zone === zone);
      if (!customization) {
        return {
          ok: false,
          error: `La personalización "${zone}" no está disponible.`,
        };
      }
      lineCustomizations.push({
        zone: customization.zone,
        unitPrice: customization.unitPrice,
      });
    }

    lines.push({
      id: buildLineId(variant.id, uniqueZones),
      productHandle: product.handle,
      productTitle: product.title,
      variantId: variant.id,
      selectedOptions: variant.selectedOptions,
      image: variant.image ?? null,
      quantity: input.quantity,
      customizations: lineCustomizations,
      priceTiers: product.priceTiers,
      designFileName: input.designFileName,
      notes: input.notes.trim(),
    });
  }

  return { ok: true, value: lines };
}

/**
 * Construye las variables de draftOrderCreate a partir de las líneas ya
 * validadas. El priceOverride es el precio unitario CON IVA incluido
 * (unitTotalWithIva): la tienda tiene activado "incluir impuesto en el
 * precio", así que Shopify espera importes con el IVA dentro y desglosa él
 * el 21% en el checkout.
 */
export function buildDraftOrderInput(lines: CartLine[]): ShopifyDraftOrderInput {
  const pricing = computeCartPricing(lines);

  return {
    lineItems: lines.map((line) => {
      const customAttributes = [];
      if (line.customizations.length > 0) {
        customAttributes.push({
          key: "Personalización",
          value: line.customizations.map((c) => c.zone).join(", "),
        });
      }
      if (line.designFileName) {
        customAttributes.push({ key: "Diseño", value: line.designFileName });
      }
      if (line.notes) {
        customAttributes.push({ key: "Observaciones", value: line.notes });
      }

      return {
        variantId: line.variantId,
        quantity: line.quantity,
        priceOverride: {
          amount: pricing.linePricing[line.id].unitTotalWithIva.toFixed(2),
          currencyCode: "EUR",
        },
        customAttributes,
      };
    }),
    note: "Pedido de la web de Plásmalo",
    tags: ["web"],
  };
}
