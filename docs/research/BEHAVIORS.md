# Behaviors — Refeet Website

## Navigation / Header
- **Fixed** at top (position: fixed, top: 0, z-index: 5)
- **Background**: transparent (`rgba(0,0,0,0)`) at ALL scroll positions
- **Appearance on dark hero**: text appears white because the nav is transparent over a dark image
- **Appearance after hero**: text appears black because the nav is transparent over white page content
- The nav itself does NOT change background — the contrast illusion comes from behind
- **Height**: ~60px, padding 12px 0
- **Text color**: white for left nav items when over dark hero, black for right items; all become dark when over white content
- **Transition**: `all` transition is set but no actual bg change happens
- **Logo**: center-positioned with "Refeet" text + SVG chevron icon
- **Left items**: Shop, Impact, About, Journal (14px, weight 400)
- **Right items**: Search, Account, Wishlist, Cart + cart count badge

## Shop Page Hero
- **Full-bleed** image, ~460px tall (viewport-filling)
- **H1**: "Shop Sustainable Sneakers" — white, 48px, weight 400, bottom-left of hero
- **Image**: B&W tennis player photo (1350x759)
- Overlaid by transparent fixed nav

## Shop Filter Sidebar
- **Position**: left column, ~280-330px wide, sticky as user scrolls
- **Sections** (collapsible with chevron): Category, Material, Sustainability, Size, Color
- **Checkboxes**: custom square checkboxes (light gray border)
- **Section headings**: 14px, bold/semi-bold, black
- **Filter labels**: 14px, black
- **Separator lines**: thin horizontal rules between sections

## Product Grid
- **3 columns** at desktop
- **Card**: no border, no shadow, transparent background
- **Image area**: light gray background (#F6F7F7 approx), image centered, aspect-ratio ~1:1.4 (portrait)
- **Below image row**: Product name (left) + Price (right), same row, 14px
- **Price**: no currency symbol, just number (e.g., "109.00")
- **Hover**: unknown — not tested

## About Page Hero
- **Full-bleed** image, similar height to shop hero
- **H1**: "Rethinking Footwear" — white, large (similar to shop), bottom-left
- **Image**: Dark B&W geometric shadows with runner silhouette

## About Page Sections (top to bottom)
1. Hero: "Rethinking Footwear" on dark B&W geometric image
2. Full-width photo: man walking with case in industrial building (with yellow stripe accent)
3. Story section: "A Journey with Purpose" — centered text block, max-width ~730px
4. Timeline: Horizontal scrolling cards (years 2019–2023) with arrow navigation
5. Mission & Values: "Our Mission & Values" — 2-column value cards on light gray bg
6. Team section: Team member cards (4 members)
7. Testimonials: 3 customer quotes
8. CTA: "Join the movement..." + "Shop The Collection" button + email subscribe input
9. Footer (shared with shop)

## Footer
- **Background**: rgb(23, 28, 27) — near-black dark green
- **Logo**: white SVG logo, top-left
- **Tagline**: "Sustainable shoes made for everyday movement..."
- **Social icons**: Facebook, X, Instagram, LinkedIn, YouTube, TikTok (row)
- **Nav columns**: SHOP | COMPANY | EXPLORE | LEGAL (column headings in caps, 12px)
- **Copyright**: bottom-left, small text
- **Payment icons**: Visa, Apple Pay, Google Pay, Mastercard (bottom-right)
