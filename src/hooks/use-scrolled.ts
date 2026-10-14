"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * true cuando la página se ha desplazado más de `threshold` px.
 *
 * Usa useSyncExternalStore (como el carrito) en lugar de useState+useEffect:
 * el scroll es estado externo al componente, y así no hay setState en
 * efectos (prohibido por el lint del proyecto). En servidor devuelve false.
 */
export function useScrolled(threshold = 10): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false
  );
}
