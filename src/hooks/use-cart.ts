"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { CartLine } from "@/types";
import { computeCartPricing, type CartPricing } from "@/lib/cart/cart";
import {
  cartActions,
  getServerSnapshot,
  getSnapshot,
  subscribe,
  type NewCartLine,
} from "@/lib/cart/cart-store";

export type { NewCartLine };

interface UseCartResult {
  lines: CartLine[];
  /** Precios ya calculados (tramos agregados por producto, IVA, ahorro). */
  pricing: CartPricing;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (line: NewCartLine) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
}

/**
 * Acceso al carrito desde componentes. Se suscribe al store externo
 * (lib/cart/cart-store.ts) y expone los precios ya calculados; no necesita
 * provider, cualquier componente cliente puede usarlo directamente.
 */
export function useCart(): UseCartResult {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pricing = useMemo(() => computeCartPricing(state.lines), [state.lines]);

  return {
    lines: state.lines,
    pricing,
    isOpen: state.isOpen,
    ...cartActions,
  };
}
