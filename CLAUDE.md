# CLAUDE.md — Plasmalo Prendas

Tienda headless de prendas personalizables: Next.js (App Router) + Shopify. El detalle de cada área vive en `docs/` (se lee solo cuando toca).

## Cómo trabajamos

Flujo iterativo, **ruta por ruta, sección por sección**: el usuario indica qué ruta construir o modificar; se implementa con datos reales. **Nunca se añade funcionalidad ni rutas no pedidas** (backend, auth, etc.). Al eliminar una ruta, se borra también del Navbar, Footer y filesystem (incluidos componentes y assets que queden huérfanos). Al crearla, se actualizan los links de Navbar y Footer.

## Reglas que NO se pueden romper

- **Tramo de descuento POR PRODUCTO**: suma las unidades de todas las variantes de ese producto; nunca por línea ni mezclando productos. La personalización es precio fijo por unidad. Ahorro siempre en dinero, nunca en %. → `docs/carrito.md`, `docs/pricing-manual.md`
- **El navegador nunca manda precios**: el servidor recalcula con `computeCartPricing` (la misma función que el drawer). → `docs/checkout.md`
- **`priceOverride` se manda CON IVA incluido** (la tienda tiene "impuesto incluido" activado) y el IVA se **redondea a céntimos por unidad** (`roundToCents`).
- **`SHOPIFY_ADMIN_ACCESS_TOKEN` es secreto**: solo en servidor (`admin-client.ts` lleva `import "server-only"`).
- No hidratar de localStorage con Context+useEffect (el lint con React Compiler prohíbe setState en efectos): usar store externo + `useSyncExternalStore`.
- `ProductConfigurator.tsx` está VALIDADO: no tocar su lógica de precios sin que se pida.
- **No volver a proponer** Shopify Functions (requieren Plus), apps de terceros de precios ni cobrar fuera de Shopify. Tampoco scripts que escriban en Shopify por API para el catálogo: se sube por CSV nativo.

## Rutas

| Ruta | Estado |
|------|--------|
| `/` | Hero + 4 categorías (foto de un producto real) + fila de productos con scroll (colección `destacados` de Shopify, hasta 12) + sectores + testimonials |
| `/prendas`, `/prendas/[categoria]` | Listados: colección de Shopify + franja de categorías + filtros por URL → `docs/catalogo.md` |
| `/sectores`, `/sectores/[slug]` | Índice de sectores y página de cada uno: prendas de Shopify con la etiqueta del sector (`lib/catalog/sector.ts`), texto en `config/sectores.ts` |
| `/brand-session`, `/club-plasmalo` | Páginas de marca |
| `/prendas/[categoria]/[handle]` | Ficha: producto real de Shopify, tramos vía metaobjetos, añadir a la cesta. Categoría = 1.ª colección de categoría que lo contiene (`lib/catalog/paths.ts`); otra categoría en la URL → redirige |
| `/sitemap.xml`, `/robots.txt` | Sitemap automático (catálogo de Shopify); robots bloquea todo mientras dure la preview |
| `POST /api/checkout` | Crea el draft order y devuelve `invoiceUrl` |

`CartDrawer` se monta global en el root layout. Navbar → `docs/navegacion.md` (datos solo en `src/config/navigation.ts`). Footer: Legal sigue en `#`.

## Estructura

**`app/` compone, `components/` pinta, `lib/` calcula y habla con Shopify, `config/` contiene datos y entorno.** Los componentes no hacen fetch ni contienen datos.

- `lib/shopify/` es la ÚNICA puerta a las APIs de Shopify (`client.ts` Storefront, `admin-client.ts` Admin, `queries/`, `adapters.ts` Shopify → tipos de dominio).
- `lib/pricing/`, `lib/cart/`, `lib/checkout/`: lógica pura. `types/`: tipos de dominio.
- `config/env.ts` es el ÚNICO lector de `process.env` (ver `.env.example`).
- `config/pricing.ts` es TEMPORAL (personalizaciones hardcodeadas + `IVA_RATE`).
- `modules/customizer-3d/`: reservado para el personalizador 3D.

Convenciones: componentes `PascalCase.tsx` con **export con nombre**; módulos no-React `kebab-case.ts`; carpetas en minúscula. Clases Tailwind, no inline styles. Imágenes siempre con `<Image>` de Next.js.

## Stack y diseño

Next.js 16, React 19, TypeScript strict, Tailwind v4, shadcn/ui (base-nova), Lucide. Deploy en Vercel. Tipografía: **Inter Tight** en titulares e **Inter** en cuerpo (como evolucionia.com), escala de 7 niveles sin letter-spacing negativo en titulares (ver `globals.css`, que también tiene los colores de marca).

## Pendiente antes de lanzar

- Checkout de principio a fin: configurar envíos (5,50 € / gratis desde 50 €) y pago de prueba en modo test
- Catálogo real: CSV de SOL'S generado, falta importarlo; Stanley/Stella y modelos no encontrados → `docs/catalogo.md`
- Tabla de tramos: provisional (la del Regent enlazada a los 29 productos); sustituir por las del cliente por familia de prenda
- Personalizaciones (Escudo/Frontal/Espalda/Manga) hardcodeadas: falta enlazar su metaobjeto al producto
- El archivo de diseño del cliente no viaja a ningún sitio (solo su nombre en el carrito)
- Testimonials: placeholder del template, sustituir por reales
- Al lanzar: quitar el `noindex` del layout raíz y el `disallow` de `robots.ts`
- Inline styles en algunos componentes

## Comandos

```bash
npm run dev        # desarrollo
npm run check      # lint + typecheck + build (también: lint, typecheck, build por separado)
```

Node.js >= 24.

## Documentación (`docs/`)

`pricing-manual.md` (contrato de pricing) · `carrito.md` · `checkout.md` · `navegacion.md` · `catalogo.md`
