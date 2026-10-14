# Checkout — implementado (2026-07-15) con Draft Orders de la Admin API

Contexto: los precios reales (tramos + personalización) los calcula NUESTRO código; las variantes en Shopify tienen un precio fijo placeholder (hoy, el precio público del proveedor). El plan de Shopify es **Basic**, y las Shopify Functions propias requieren Plus → descartadas. Alternativas también descartadas: apps de terceros (no cubren la personalización fija, doble fuente de verdad), cobro fuera de Shopify (rompe la unificación de pedidos). **No volver a proponerlas.**

## Flujo

1. "Tramitar pedido" (CartDrawer) → `POST /api/checkout` con solo REFERENCIAS (handle, variantId, cantidad, zonas, nombre del diseño, notas) — **el navegador nunca manda precios**
2. El servidor valida el payload (type guards estrictos, topes de sanidad), lee los productos FRESCOS de Shopify (`getProduct(handle, { revalidate: 0 })`) y recalcula precios con `computeCartPricing` — la MISMA función que usa el drawer
3. `draftOrderCreate` (Admin API) con `priceOverride` por línea + personalización/diseño/notas como `customAttributes`
4. Respuesta `{ invoiceUrl }` → el navegador redirige al checkout nativo de Shopify, donde se paga. El carrito NO se vacía (si el cliente cancela el pago, conserva su pedido)

Archivos: `app/api/checkout/route.ts`, `lib/checkout/checkout.ts`, `lib/shopify/admin-client.ts`, `lib/shopify/queries/draft-order.ts`.

## Detalles críticos (no cambiar sin entender esto)

- **La tienda tiene "incluir impuesto en el precio" ACTIVADO** en Shopify → el `priceOverride` se manda CON IVA incluido (`unitTotalWithIva`), y Shopify desglosa él el 21%. Si se mandara sin IVA, el cliente pagaría de menos.
- **El IVA se redondea a céntimos POR UNIDAD** (`roundToCents` en lib/pricing), porque así cobra Shopify (precio unitario de 2 decimales × cantidad). `computeCartPricing` redondea igual, así el total del drawer y el del checkout coinciden céntimo a céntimo.
- El token de Admin API (`SHOPIFY_ADMIN_ACCESS_TOKEN`, app personalizada con scope `write_draft_orders`) es SECRETO: `admin-client.ts` lleva `import "server-only"` para que el build falle si acaba en un client component. Al desplegar hay que añadirlo en Vercel.

## Pendiente

Configurar envíos en el admin (España: 5,50 € estándar, gratis desde 50 € — lo aplica Shopify solo en el checkout, sin código nuestro) y probar un pago con el gateway en modo test. Fases futuras: subida real del archivo de diseño, webhooks (vaciar carrito tras pago, revalidación ISR).
