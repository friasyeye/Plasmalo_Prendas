# CLAUDE.md — Plasmalo Prendas

## Punto de partida

Este proyecto nació como **clon visual** de dos templates distintos (Refeet para `/about` y `/shop`, FabFit para la Home). El objetivo era capturar diseño y layout, no contenido real.

**`/about` y `/shop` fueron eliminadas** (2026-07-06): eran páginas huérfanas sin Navbar ni Footer propios, con contenido 100% del template original en inglés (Refeet, "zapatillas sostenibles"), sin ninguna relación con Plásmalo. Se limpiaron también sus 11 componentes exclusivos, sus assets en `/public/images`, y `src/types/index.ts` (tipos no usados en ningún componente).

Lo que **NO está hecho todavía** (y es esperado en esta fase):
- Los datos de la Home siguen parcialmente hardcodeados (categorías, testimonials)
- El carrito del Navbar no tiene lógica real
- Hay inline styles en lugar de clases Tailwind en algunos componentes

**Esto es correcto para esta etapa.** El sitio es una maqueta visual funcional, no un e-commerce real.

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
| `/` | TopBar + Navbar + Hero + Categories + Testimonials + Footer | Única ruta activa |

No hay rutas adicionales creadas todavía. El Navbar (categorías de producto) y el Footer (catálogo, legal) usan `#` como placeholder hasta que se pidan páginas reales.

---

## Navbar actual

Categorías: **Camisetas · Sudaderas · Polos · Merchandising** (enlazan a `#`)
Logo: centrado a la izquierda en mobile, `/images/logo_plasmalo.png`
Carrito a la derecha (sin lógica real).

Comportamiento: blanco fijo (`sticky`), añade borde/sombra al hacer scroll.

---

## Footer actual

Cinco columnas: **Logo · Catálogo · Redes Sociales · Contacto · Legal**
- Catálogo apunta a `#` (placeholder, sin páginas de producto aún)
- Redes Sociales y Contacto tienen datos reales de Plásmalo (Instagram, WhatsApp, email, ubicación Barcelona)
- Legal apunta a `#` (FAQ, Privacidad, Términos, Devoluciones, Envíos — sin páginas aún)

---

## Componentes existentes

```
src/
  app/
    layout.tsx          → Root layout: fonts locales (General Sans, Satoshi)
    page.tsx            → Home (única ruta)
    globals.css         → Tailwind v4, design tokens, colores de marca
    favicon.ico

  components/
    TopBar.tsx          → Banner superior con marquee (envío, producción, etc.)
    Navbar.tsx          → Nav sticky con scroll detection (client component)
    Hero.tsx            → Hero de la Home con imágenes y CTAs
    Categories.tsx      → Grid de categorías de producto
    Testimonials.tsx    → Marquee de testimonials reales de Plásmalo
    Footer.tsx          → Footer con logo, catálogo, redes, contacto, legal
    ui/
      button.tsx        → shadcn Button con variantes

  lib/
    utils.ts            → cn() utility (clsx + tailwind-merge)

  hooks/                → vacío (placeholder, .gitkeep)
  types/                → vacío (placeholder, .gitkeep)
```

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
- **Fuente**: General Sans + Satoshi (fonts locales en `src/app/fonts`)
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
