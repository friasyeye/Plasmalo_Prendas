# Navbar y Footer

## Navbar

Datos: `src/config/navigation.ts` es la ÚNICA fuente (escritorio y móvil).
Entradas: **Prendas · Merchandising · Sectores** (menús) · **Brand Session · Club Plásmalo** (enlaces).
Carrito a la derecha: muestra las unidades reales (vía `useCart`) y abre el CartDrawer.
Código: `components/layout/Navbar.tsx` (servidor: resuelve las fotos de producto con
`lib/navigation.ts` → `withNavPhotos`) + `NavbarClient.tsx` y `components/layout/nav/` (cliente).

Comportamiento (`variant`):
- `"overlay"` (Home, brand-session, club): transparente con texto/logo
  blancos, también al hacer scroll; blanco SOLO al hover o con un menú abierto.
  Barra y mega-menú comparten transición (`nav/transition.ts`) para aparecer a
  la vez; los paneles van siempre montados (ocultos) con imágenes precargadas.
  El hero de esas páginas sube por debajo (`-mb-16`) y reserva `pt-16`.
- `"solid"` (resto): siempre blanco.

Mega-menú (escritorio): al hover muestra las 3 primeras entradas del menú como
tarjetas con imagen + "Descubrir todo" (estilo Nude Project); sin imagen, la tarjeta
es un placeholder gris. Una entrada puede llevar `image` (ruta local, foto de escena
a sangre: Sectores) o `photo` (producto de Shopify + color, se ve entera sobre blanco).
**Prendas** se genera de `prendasSection` (`config/catalog.ts`): mismas categorías y
orden que la franja de `/prendas`; las fotos van en `prendasMenuPhotos` (por slug).
Un menú con `href` (Prendas → `/prendas`) es además un enlace: clic = ir a la página,
hover = mega-menú; en táctil el 1.er toque abre y el 2.º navega; con teclado, ↓ abre.
En táctil/teclado se abre al pulsar.

Móvil (estilo Nude Project): navegación por PANTALLAS, no acordeón. Principal:
los `link` en grande y los `menu` con →. Al tocar un menú la pantalla se
sustituye por la suya (título, miga "Menú / Sección", "← Menú", entradas).
Se abre bajo la barra (que muestra la X), bloquea el scroll de la página.

## Footer

Cinco columnas: **Logo · Catálogo · Redes Sociales · Contacto · Legal**
- Catálogo: Camisetas, Sudaderas, Polos → sus páginas `/prendas/[categoria]`
- Redes Sociales y Contacto tienen datos reales de Plásmalo (Instagram, WhatsApp, email, ubicación Barcelona)
- Legal apunta a `#` (FAQ, Privacidad, Términos, Devoluciones, Envíos — sin páginas aún)
