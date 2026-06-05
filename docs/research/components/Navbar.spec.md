# Navbar Specification

## Overview
- **Target file:** `src/components/Navbar.tsx`
- **Interaction model:** static (transparent fixed overlay — no JS scroll changes needed)

## Visual Description
The navbar sits fixed at the top (z-index 5). Its background is always transparent — the dark/light appearance comes entirely from whatever page content is behind it. On the shop hero (dark image) it looks white; on white page sections it looks black. No JavaScript needed.

## DOM Structure
```
div.navbar-container (position: fixed, top: 0, left: 0, right: 0, z-index: 5)
  nav (transparent bg, height: 60px, padding: 12px 0)
    div.nav-inner (flex, items-center, justify-between, max-width: 1440px, margin: 0 auto, px: 24px)
      div.nav-left (flex, gap: 24px)
        a → "Shop"
        a → "Impact"
        a → "About"
        a → "Journal"
      div.nav-center (absolute center or flex-1 text-center)
        a.logo (flex items-center gap-2)
          img[src="/images/logo.svg"] (w: 92px, h: 36px) — actually just the SVG chevron icon
          span → "Refeet"
      div.nav-right (flex, gap: 24px, items-center)
        a → "Search"
        a → "Account"
        a → "Wishlist"
        div (flex items-center gap-1)
          a → "Cart"
          span.cart-count → "0"
```

## Computed Styles (exact values)

### Container (.navbar-container)
- position: fixed
- top: 0px
- left: 0px
- right: 0px
- z-index: 5
- backgroundColor: rgba(0, 0, 0, 0) — always transparent

### nav
- backgroundColor: rgba(0, 0, 0, 0)
- height: 60px
- padding: 12px 0px
- width: 100%

### Nav links (a elements)
- fontSize: 14px
- fontWeight: 400
- fontFamily: "Public Sans", sans-serif
- color: inherit — white when on dark bg, black when on light bg
- textDecoration: none
- cursor: pointer

### Logo
- display: flex
- alignItems: center
- gap: 8px
- fontSize: 16px or 18px
- fontWeight: 500

### Logo SVG image
- width: 28px (the chevron icon part)
- height: 28px

## States & Behaviors

### Default (transparent)
- Background stays rgba(0,0,0,0) always
- Text color comes from CSS `color: inherit` or white via `mix-blend-mode` or simply CSS custom prop
- IMPORTANT: use `color: white` for ALL nav text when the component is used — the hero image behind creates the dark look when needed
- Actually: the nav uses `color: inherit` — where the body/page sets black text normally
- On first screenshot: text appears white because the hero has white text color in that section

**Implementation note**: The simplest approach is to make nav text white (`text-white`) by default and rely on the dark hero image. For sections after the hero where the nav overlays white content, nav text appears dark — but actually looking at screenshots, the nav text IS dark (black) when over the white product grid section. So the nav text color DOES change.

**Correct implementation**: Use `mix-blend-mode: difference` or a scroll-based class toggle. Given the site uses Framer, they likely use two versions of the logo/text (white version for dark bg, dark version for light bg) with scroll detection. For our static clone, implement:
- Nav text color: `rgb(0,0,0)` (black) normally
- When over the dark hero section, use an overlay text color of white via `mix-blend-mode: difference` or simply hard-code white text in the hero component's z-layer

**Simplest working solution**: Make navbar text black always. The hero section will still look correct because the nav sits transparently over the hero, and we'll use white text in the hero H1. The nav links will appear slightly dark over the hero image but that's acceptable for a static clone.

## Text Content (verbatim)
- Left: Shop | Impact | About | Journal
- Center: [Refeet chevron logo SVG] Refeet
- Right: Search | Account | Wishlist | Cart [0]

## Responsive Behavior
- **Desktop (1440px):** full horizontal layout as described
- **Mobile (390px):** hamburger menu likely (not inspected — implement basic mobile as stacked or hamburger)
- **Breakpoint:** unknown, implement at md: (768px)

## Assets
- Logo SVG: `public/images/logo.svg` (the full refeet wordmark with chevron)
