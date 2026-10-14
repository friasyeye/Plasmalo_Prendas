# Carrito (implementado 2026-07-13)

Reglas de negocio **confirmadas por el cliente** (no inferidas — no cambiarlas sin preguntar):

- **El tramo de descuento se calcula POR PRODUCTO**, sumando las unidades de todas las variantes (color/talla) de ese producto en el pedido. Ej.: 5 Regent rojas + 20 Regent azules = 25 uds → ambas líneas pagan la prenda al tramo 25-49. Nunca por línea individual, nunca mezclando productos distintos.
- **La personalización es específica de cada línea** (precio fijo por unidad, nunca varía con la cantidad).
- **Líneas idénticas se fusionan**: mismo producto + variante + zonas de personalización → una sola línea sumando cantidades (id determinista: `variantId::zonas-ordenadas`).
- **Del archivo de diseño solo se persiste el nombre** (un File no cabe en localStorage); el archivo real se recogerá en el paso de pedido.
- **Ahorro siempre en dinero, nunca porcentajes** (manual de pricing). El helper compartido es `getNextTierSavings` (lib/pricing); la personalización se cancela matemáticamente en ese cálculo, por eso el mismo helper vale para configurador y carrito.
- **IVA visible** en formato "X € + IVA" grande + "Y € IVA incluido" pequeño debajo. Resumen del pedido siempre visible (drawer y configurador).

## Arquitectura

La fuente de verdad de pricing del negocio es `docs/pricing-manual.md`. Cada `CartLine` guarda una copia de `priceTiers` de su producto para recalcular sin volver a consultar Shopify (trade-off aceptado: precios "viejos" hasta revisitar la página del producto).

Estado con store externo + `useSyncExternalStore`. **No usar Context+useEffect para hidratar de localStorage: el lint del proyecto (React Compiler) prohíbe setState dentro de efectos.**

Archivos: `lib/cart/cart.ts` (lógica pura: fusión, agregación por producto, `computeCartPricing`), `cart-storage.ts` (localStorage validado, clave `plasmalo:cart:v1`), `cart-store.ts` (store), `hooks/use-cart.ts`, `components/cart/CartDrawer.tsx`.

El configurador (`ProductConfigurator.tsx`) está VALIDADO: no tocar su lógica de precios sin que se pida.
