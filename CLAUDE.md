# CLAUDE.md — Plasmalo Prendas

## Punto de partida

Este proyecto nació como **clon visual** de dos templates distintos (Refeet para `/about` y `/shop`, FabFit para la Home). El objetivo era capturar diseño y layout, no contenido real.

**`/about` y `/shop` fueron eliminadas** (2026-07-06): eran páginas huérfanas sin Navbar ni Footer propios, con contenido 100% del template original en inglés (Refeet, "zapatillas sostenibles"), sin ninguna relación con Plásmalo. Se limpiaron también sus 11 componentes exclusivos, sus assets en `/public/images`, y `src/types/index.ts` (tipos no usados en ningún componente).

Lo que **NO está hecho todavía** (y es esperado en esta fase):
- **Probar el checkout de principio a fin**: el código está implementado (ver sección Checkout), pero falta configurar los envíos en el admin de Shopify (5,50 € / gratis desde 50 €) y hacer un pago de prueba con el gateway en modo test
- El grid de la Home pinta los productos reales de la colección `destacados` de Shopify, pero rellena con placeholders de `/public/fabfit/` hasta completar 4 tarjetas — faltan productos reales en Shopify
- Los testimonials son contenido placeholder del template (en inglés, avatares de stock) — sustituir por reales antes de lanzar
- Las personalizaciones (Escudo/Frontal/Espalda/Manga) están hardcodeadas en `src/config/pricing.ts` — falta enlazar su metaobjeto al producto (mismo patrón que los tramos de precio)
- El archivo de diseño subido por el cliente no viaja a ningún sitio: solo se persiste su nombre en el carrito
- `noindex` activo en el layout raíz — quitar antes de lanzar
- Hay inline styles en lugar de clases Tailwind en algunos componentes

---

## Cómo trabajamos a partir de aquí

El flujo de trabajo es iterativo: **ruta por ruta, sección por sección**.

1. El usuario indica qué ruta quiere construir o modificar a continuación
2. Se implementa esa ruta con datos reales y funcionalidad real
3. Las rutas que el usuario decida eliminar se borran del Navbar, Footer y del código (incluyendo componentes y assets exclusivos que queden huérfanos)
4. Nunca se añade funcionalidad no pedida explícitamente

---

## Rutas actuales del proyecto

| Ruta | Componente principal | Estado |
|------|---------------------|--------|
| `/` | TopBar + Navbar + Hero + Categories + Testimonials + Footer | Productos destacados reales de Shopify + placeholders de relleno |
| `/product/[handle]` | Breadcrumb + ProductView (ProductGallery + ProductConfigurator) | Funcional: datos reales de Shopify, tramos de precio vía metaobjetos, añadir a la cesta operativo |

El `CartDrawer` se monta global en el root layout (no es una ruta). El Navbar (categorías de producto) y el Footer (catálogo, legal) usan `#` como placeholder hasta que se pidan páginas reales.

---

## Navbar actual

Categorías: **Camisetas · Sudaderas · Polos · Merchandising** (enlazan a `#`)
Logo: centrado a la izquierda en mobile, `/images/logo_plasmalo.png`
Carrito a la derecha: muestra las unidades reales (vía `useCart`) y abre el CartDrawer.

Comportamiento: blanco fijo (`sticky`), añade borde/sombra al hacer scroll.

---

## Footer actual

Cinco columnas: **Logo · Catálogo · Redes Sociales · Contacto · Legal**
- Catálogo apunta a `#` (placeholder, sin páginas de producto aún)
- Redes Sociales y Contacto tienen datos reales de Plásmalo (Instagram, WhatsApp, email, ubicación Barcelona)
- Legal apunta a `#` (FAQ, Privacidad, Términos, Devoluciones, Envíos — sin páginas aún)

---

## Estructura del proyecto (reestructuración 2026-07-06)

Regla general: **`app/` compone, `components/` pinta, `lib/` calcula y habla
con Shopify, `config/` contiene datos y entorno**. Los componentes no hacen
fetch ni contienen datos: los reciben de `config/` (hoy) o de `lib/shopify`
(cuando se conecte el catálogo).

```
src/
  app/
    layout.tsx          → Root layout: fonts locales, monta el CartDrawer global
    page.tsx            → Home; compone secciones + productos destacados de Shopify
    product/[handle]/   → Página de producto (server component, fetch por handle)
    api/checkout/       → POST "Tramitar pedido": valida, recalcula precios y
                          crea el draft order (ver sección Checkout)
    globals.css         → Tailwind v4, design tokens, colores de marca

  components/
    layout/             → chrome del sitio (presente en todas las páginas)
      TopBar.tsx (+css) → Banner superior con marquee
      Navbar.tsx        → Nav sticky con scroll detection; badge real del carrito
      Footer.tsx        → Footer con logo, catálogo, redes, contacto, legal
    home/               → secciones específicas de la Home
      Hero.tsx          → Hero con imágenes y CTAs
      Categories.tsx    → Grid de 4 productos destacados (con placeholders de relleno)
      Testimonials.tsx  → Marquee de testimonials (contenido placeholder del template)
    product/            → página de producto
      ProductView.tsx   → estado compartido de opciones entre galería y configurador
      ProductGallery.tsx→ galería de fotos del color activo
      ProductConfigurator.tsx → configurador: personalización, diseño, opciones,
                          cantidad, resumen, añadir a la cesta (VALIDADO, no tocar
                          su lógica de precios sin pedirlo)
    cart/
      CartDrawer.tsx    → drawer lateral: líneas agrupadas por producto, ahorro,
                          resumen siempre visible; "Tramitar pedido" disabled
    icons/              → SVGs compartidos (CartIcon, InstagramIcon)
    ui/
      button.tsx        → shadcn Button con variantes (aún sin uso)

  config/
    site.ts             → datos del chrome: nav, TopBar, footer, contacto
    home.ts             → placeholders de la Home (grid, testimonials)
    pricing.ts          → TEMPORAL: personalizaciones hardcodeadas + IVA_RATE
    env.ts              → ÚNICO lector de process.env (ver .env.example)

  lib/
    shopify/            → ÚNICA puerta hacia las APIs de Shopify
      client.ts         → shopifyFetch (Storefront API, con revalidate ISR)
      admin-client.ts   → shopifyAdminFetch (Admin API, server-only, sin caché)
      queries/          → documentos GraphQL (uno por área; ver su README)
      types.ts          → tipos crudos de las APIs de Shopify
      adapters.ts       → traduce tipos Shopify → tipos de dominio
    pricing/
      tiered-pricing.ts → cálculo puro: precio por tramo, total, getNextTierSavings,
                          roundToCents (redondeo del IVA por unidad)
    checkout/
      checkout.ts       → lógica pura del checkout: valida el payload del
                          navegador y construye el input de draftOrderCreate
    cart/
      cart.ts           → lógica pura del carrito: fusión de líneas, agregación
                          de tramos POR PRODUCTO, computeCartPricing
      cart-storage.ts   → persistencia localStorage validada (clave plasmalo:cart:v1)
      cart-store.ts     → store externo (useSyncExternalStore); estado líneas + drawer
    format.ts           → formatEUR compartido
    utils.ts            → cn() utility (clsx + tailwind-merge)

  types/                → tipos de DOMINIO (Product, PriceTier, CartLine…)
  hooks/
    use-cart.ts         → hook de acceso al carrito (sin provider)
  modules/
    customizer-3d/      → reservado para el personalizador 3D (ver su README)
```

Convenciones: componentes en `PascalCase.tsx` con **export con nombre** (no
default); módulos no-React en `kebab-case.ts`; carpetas en minúscula.

---

## Design tokens (globals.css)

Fuentes locales: **General Sans** (`--font-general-sans`) y **Satoshi** (`--font-satoshi`).
Colores de marca definidos como variables CSS en `globals.css` (revisar el archivo directamente para valores actuales).

---

## Arquitectura y routing — Shopify Headless + Next.js App Router

1. **Estructura de URLs y rutas**
   - NO crear una página genérica `/tienda` o `/shop` como landing. La URL raíz `/` es el punto de entrada principal del catálogo.
   - Productos: `src/app/product/[handle]/page.tsx` — el parámetro `[handle]` es el slug del producto en Shopify.
   - Colecciones: `src/app/collection/[handle]/page.tsx`.

2. **Home page (src/app/page.tsx)**
   - Bajo el Hero, exactamente 4 productos en grid. IMPLEMENTADO: consulta la colección `destacados` de la Storefront API (getFeaturedProducts) y rellena con placeholders de `config/home.ts` hasta completar 4 tarjetas — el cliente gestiona los destacados desde el admin de Shopify sin tocar código.
   - Las tarjetas con `handle` enlazan a `/product/${handle}` con `Link` de Next.js; los placeholders no enlazan.

3. **Principio de fetching de datos**
   - Todas las páginas de producto comparten los mismos componentes de layout.
   - El contenido (títulos, descripciones, precios, imágenes, variantes de talla/color) se obtiene de forma asíncrona mediante server components basándose en el `handle` de la URL actual.

---

## Carrito (implementado 2026-07-13)

Reglas de negocio **confirmadas por el cliente** (no inferidas — no cambiarlas sin preguntar):

- **El tramo de descuento se calcula POR PRODUCTO**, sumando las unidades de todas las variantes (color/talla) de ese producto en el pedido. Ej.: 5 Regent rojas + 20 Regent azules = 25 uds → ambas líneas pagan la prenda al tramo 25-49. Nunca por línea individual, nunca mezclando productos distintos.
- **La personalización es específica de cada línea** (precio fijo por unidad, nunca varía con la cantidad).
- **Líneas idénticas se fusionan**: mismo producto + variante + zonas de personalización → una sola línea sumando cantidades (id determinista: `variantId::zonas-ordenadas`).
- **Del archivo de diseño solo se persiste el nombre** (un File no cabe en localStorage); el archivo real se recogerá en el paso de pedido.
- **Ahorro siempre en dinero, nunca porcentajes** (manual de pricing). El helper compartido es `getNextTierSavings` (lib/pricing); la personalización se cancela matemáticamente en ese cálculo, por eso el mismo helper vale para configurador y carrito.
- **IVA visible** en formato "X € + IVA" grande + "Y € IVA incluido" pequeño debajo. Resumen del pedido siempre visible (drawer y configurador).

Arquitectura: la fuente de verdad de pricing del negocio es `docs/pricing-manual.md`. Cada `CartLine` guarda una copia de `priceTiers` de su producto para recalcular sin volver a consultar Shopify (trade-off aceptado: precios "viejos" hasta revisitar la página del producto). Estado con store externo + `useSyncExternalStore` — **no usar Context+useEffect para hidratar de localStorage: el lint del proyecto (React Compiler) prohíbe setState dentro de efectos.**

---

## Checkout — implementado (2026-07-15) con Draft Orders de la Admin API

Contexto: los precios reales (tramos + personalización) los calcula NUESTRO código; las variantes en Shopify tienen un precio fijo placeholder. El plan de Shopify es **Basic**, y las Shopify Functions propias requieren Plus → descartadas. Alternativas también descartadas: apps de terceros (no cubren la personalización fija, doble fuente de verdad), cobro fuera de Shopify (rompe la unificación de pedidos). **No volver a proponerlas.**

Flujo implementado:
1. "Tramitar pedido" (CartDrawer) → `POST /api/checkout` con solo REFERENCIAS (handle, variantId, cantidad, zonas, nombre del diseño, notas) — **el navegador nunca manda precios**
2. El servidor valida el payload (type guards estrictos, topes de sanidad), lee los productos FRESCOS de Shopify (`getProduct(handle, { revalidate: 0 })`) y recalcula precios con `computeCartPricing` — la MISMA función que usa el drawer
3. `draftOrderCreate` (Admin API) con `priceOverride` por línea + personalización/diseño/notas como `customAttributes`
4. Respuesta `{ invoiceUrl }` → el navegador redirige al checkout nativo de Shopify, donde se paga. El carrito NO se vacía (si el cliente cancela el pago, conserva su pedido)

Detalles críticos (no cambiar sin entender esto):
- **La tienda tiene "incluir impuesto en el precio" ACTIVADO** en Shopify → el `priceOverride` se manda CON IVA incluido (`unitTotalWithIva`), y Shopify desglosa él el 21%. Si se mandara sin IVA, el cliente pagaría de menos.
- **El IVA se redondea a céntimos POR UNIDAD** (`roundToCents` en lib/pricing), porque así cobra Shopify (precio unitario de 2 decimales × cantidad). `computeCartPricing` redondea igual, así el total del drawer y el del checkout coinciden céntimo a céntimo.
- El token de Admin API (`SHOPIFY_ADMIN_ACCESS_TOKEN`, app personalizada con scope `write_draft_orders`) es SECRETO: `admin-client.ts` lleva `import "server-only"` para que el build falle si acaba en un client component. Al desplegar hay que añadirlo en Vercel.

Pendiente para el flujo completo: configurar envíos en el admin (España: 5,50 € estándar, gratis desde 50 € — lo aplica Shopify solo en el checkout, sin código nuestro) y probar un pago con el gateway en modo test. Fases futuras: subida real del archivo de diseño, webhooks (vaciar carrito tras pago, revalidación ISR).

---

## Reglas de desarrollo

- **No crear rutas que el usuario no haya pedido**
- **No añadir funcionalidad no solicitada** (backend, auth, etc.)
- Cuando el usuario pida eliminar una ruta: borrarla del Navbar, Footer y del filesystem
- Cuando el usuario pida crear una ruta: crear el archivo en `src/app/[ruta]/page.tsx` y actualizar los links del Navbar y Footer que correspondan
- Mantener el stack: Next.js App Router, TypeScript strict, Tailwind v4, shadcn/ui
- Al crear nuevos componentes: usar clases Tailwind, no inline styles
- Al usar imágenes: siempre `<Image>` de Next.js, nunca `<img>`

---

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19
- **TypeScript**: strict mode
- **Estilos**: Tailwind CSS v4 + shadcn/ui (base-nova)
- **Fuente**: General Sans + Satoshi (fonts locales en `src/app/fonts`)
- **Icons**: Lucide React + SVGs inline en Footer
- **Deploy target**: Vercel

---

## Comandos

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run typecheck  # Verificar tipos TypeScript
npm run lint       # ESLint
npm run check      # lint + typecheck + build
```

> Node.js >= 24 requerido. El package.json está en la raíz del repo
> (la carpeta anidada duplicada se aplanó en la reestructuración de 2026-07-06).
