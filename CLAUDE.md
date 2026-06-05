# CLAUDE.md — Plasmalo Prendas

## Punto de partida

Este proyecto es un **clon visual** de Refeet (marca de zapatillas sostenibles). El objetivo fue capturar fielmente el diseño, layout y estética del original. Eso está conseguido.

Lo que **NO está hecho** (y es esperado en esta fase):
- Los datos son todos hardcodeados (productos, equipo, testimonials, timeline)
- Muchas rutas del Navbar y Footer apuntan a `#` o a páginas que no existen aún
- Los filtros del shop tienen UI pero no filtran nada
- El formulario de newsletter no envía nada
- Hay inline styles en lugar de clases Tailwind en varios componentes

**Esto es correcto para esta etapa.** El sitio es una maqueta visual funcional, no un e-commerce real.

---

## Cómo trabajamos a partir de aquí

El flujo de trabajo es iterativo: **ruta por ruta, sección por sección**.

1. El usuario indica qué ruta quiere construir o modificar a continuación
2. Se implementa esa ruta con datos reales y funcionalidad real
3. Las rutas que el usuario decida eliminar se borran del Navbar, Footer y del código
4. Nunca se añade funcionalidad no pedida explícitamente

---

## Rutas actuales del proyecto

### Existen y tienen contenido visual
| Ruta | Componente principal | Estado |
|------|---------------------|--------|
| `/` | Redirect a `/shop` | Funcional |
| `/shop` | ShopHero + FilterSidebar + ProductGrid | Visual OK, filtros sin lógica |
| `/about` | AboutHero + AboutFullPhoto + StorySection + Timeline + MissionValues + TeamSection + Testimonials + CTASection | Visual OK, datos hardcodeados |

### Referenciadas pero NO existen
Estas rutas aparecen en el Navbar o Footer pero no tienen página. Son `#` o 404:
- `/impact`
- `/journal`
- `/search`
- `/account`
- `/wishlist`
- `/cart`
- `/careers`
- `/sizing`
- `/contact`
- `/faq`
- `/privacy-policy`
- `/terms`
- `/shipping-returns`

---

## Navbar actual

Links izquierda: **Shop · Impact · About · Journal**
Links derecha: **Search · Account · Wishlist · Cart (0)**
Logo: centrado, `/images/logo.svg`

Comportamiento: transparente en top → blanco con borde al scrollear (threshold: 400px).

---

## Footer actual

Cuatro columnas: **SHOP · COMPANY · EXPLORE · LEGAL**
La mayoría de links apuntan a `#`. Los únicos funcionales son `/`, `/shop`, `/about`.

---

## Componentes existentes

```
src/
  app/
    layout.tsx          → Root layout: Public Sans font, Navbar + Footer wrapper
    page.tsx            → Redirect a /shop
    globals.css         → Tailwind v4, design tokens oklch, colores de marca
    shop/page.tsx       → Página shop
    about/page.tsx      → Página about
    favicon.ico

  components/
    Navbar.tsx          → Fixed nav con scroll detection (client component)
    Footer.tsx          → Footer oscuro con 4 columnas + social icons
    ShopHero.tsx        → Hero section de shop
    FilterSidebar.tsx   → Sidebar de filtros (UI sin lógica)
    ProductGrid.tsx     → Grid de productos hardcodeados
    ProductCard.tsx     → Card individual de producto
    AboutHero.tsx       → Hero section de about
    AboutFullPhoto.tsx  → Imagen full-width
    StorySection.tsx    → Sección narrativa con imagen + texto
    Timeline.tsx        → Timeline horizontal con scroll
    MissionValues.tsx   → 4 tarjetas de valores
    TeamSection.tsx     → Grid del equipo
    Testimonials.tsx    → 3 testimonials
    CTASection.tsx      → Sección CTA + formulario email (sin handler)
    ui/
      button.tsx        → shadcn Button con variantes

  lib/
    utils.ts            → cn() utility (clsx + tailwind-merge)

  types/
    index.ts            → Interfaces: Product, FilterState, SortOption, etc.
```

---

## Design tokens (globals.css)

```
--refeet-dark:    rgb(23, 28, 27)    → Color principal oscuro (backgrounds, textos)
--refeet-muted:   rgb(118, 118, 118) → Textos secundarios
--refeet-surface: rgb(246, 247, 247) → Fondos claros
Font: Public Sans (Google Fonts) → variable: --font-public-sans
```

---

## Arquitectura y routing — Shopify Headless + Next.js App Router

1. **Estructura de URLs y rutas**
   - NO crear una página genérica `/tienda` o `/shop` como landing. La URL raíz `/` es el punto de entrada principal del catálogo.
   - Productos: `src/app/product/[handle]/page.tsx` — el parámetro `[handle]` es el slug del producto en Shopify.
   - Colecciones: `src/app/collection/[handle]/page.tsx`.

2. **Home page (src/app/page.tsx)**
   - Bajo el Hero, mostrar exactamente 3 productos en grid dinámico.
   - Implementación: consultar la Storefront API de Shopify para productos de la colección con handle `home` o `destacados` — así el cliente gestiona los productos destacados desde el admin de Shopify sin tocar código.
   - Las product cards deben enlazar dinámicamente a `/product/${product.handle}` usando el componente `Link` de Next.js.

3. **Principio de fetching de datos**
   - Todas las páginas de producto comparten los mismos componentes de layout.
   - El contenido (títulos, descripciones, precios, imágenes, variantes de talla/color) se obtiene de forma asíncrona mediante server components basándose en el `handle` de la URL actual.

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
- **Fuente**: Public Sans (Google Fonts)
- **Icons**: Lucide React + SVGs inline en Footer
- **Deploy target**: Vercel

---

## Comandos

```bash
npm run dev        # Servidor de desarrollo (desde /PLASMALO_PRENDAS)
npm run build      # Build de producción
npm run typecheck  # Verificar tipos TypeScript
npm run lint       # ESLint
```

> Node.js >= 24 requerido. El package.json está en `/PLASMALO_PRENDAS/`, no en la raíz del repo.
