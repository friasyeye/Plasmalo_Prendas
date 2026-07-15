import type { CartLine } from "@/types";
import { addLine, buildLineId, removeLine, setLineQuantity } from "./cart";
import { loadCartLines, saveCartLines } from "./cart-storage";

/**
 * Store externo del carrito (patrón useSyncExternalStore).
 *
 * ¿Por qué un store de módulo y no Context/Zustand? El estado son dos cosas
 * (líneas + drawer abierto), la lógica de negocio ya es pura en ./cart.ts, y
 * localStorage es un sistema EXTERNO a React: useSyncExternalStore es
 * exactamente la herramienta de React para suscribirse a él, sin provider en
 * el layout ni dependencias nuevas.
 *
 * Hidratación: el snapshot de servidor es siempre un carrito vacío y el
 * primer render del cliente lo replica; localStorage se lee en la primera
 * suscripción (que React ejecuta después de hidratar). Así el HTML del
 * servidor y el del cliente coinciden siempre.
 */

export interface CartState {
  lines: CartLine[];
  isOpen: boolean;
}

/** Lo que aporta el configurador; el id de línea lo calcula el store. */
export type NewCartLine = Omit<CartLine, "id">;

let state: CartState = { lines: [], isOpen: false };
let hydrated = false;
const listeners = new Set<() => void>();

function setState(partial: Partial<CartState>): void {
  state = { ...state, ...partial };
  for (const listener of listeners) listener();
}

function setLines(lines: CartLine[]): void {
  saveCartLines(lines);
  setState({ lines });
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // Primera suscripción (solo cliente, tras hidratar): cargar el carrito
  // persistido. Es una lectura única, no una suscripción a "storage".
  if (!hydrated) {
    hydrated = true;
    const stored = loadCartLines();
    if (stored.length > 0) setState({ lines: stored });
  }
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CartState {
  return state;
}

const SERVER_STATE: CartState = { lines: [], isOpen: false };

export function getServerSnapshot(): CartState {
  return SERVER_STATE;
}

export const cartActions = {
  openCart(): void {
    setState({ isOpen: true });
  },
  closeCart(): void {
    setState({ isOpen: false });
  },
  addToCart(line: NewCartLine): void {
    const id = buildLineId(
      line.variantId,
      line.customizations.map((c) => c.zone)
    );
    setLines(addLine(state.lines, { ...line, id }));
  },
  removeFromCart(lineId: string): void {
    setLines(removeLine(state.lines, lineId));
  },
  updateQuantity(lineId: string, quantity: number): void {
    setLines(setLineQuantity(state.lines, lineId, quantity));
  },
};
