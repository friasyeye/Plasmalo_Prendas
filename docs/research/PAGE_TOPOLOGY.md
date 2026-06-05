# Page Topology — Refeet Website

## Shared Layout
- Fixed transparent header (z-index: 5) overlaid on all pages
- Footer (dark background) at bottom of all pages

## /shop Page
Order (top to bottom):
1. [FIXED OVERLAY] Navbar — transparent, fixed top
2. ShopHero — full-bleed B&W photo, ~460px tall, "Shop Sustainable Sneakers" H1
3. ShopContent — 2-column: FilterSidebar (left ~280px) + ProductGrid (right, 3 cols)
4. Footer — dark background

## /about Page
Order (top to bottom):
1. [FIXED OVERLAY] Navbar — transparent, fixed top
2. AboutHero — full-bleed dark geometric B&W photo, "Rethinking Footwear" H1
3. AboutFullPhoto — full-width editorial photo (man with case)
4. StorySection — "A Journey with Purpose" text block
5. Timeline — horizontal scrolling timeline (2019–2023)
6. MissionValues — "Our Mission & Values" 2-column cards on light gray bg
7. Team — team member cards
8. Testimonials — 3 customer quote cards
9. CTASection — CTA + email subscribe
10. Footer

## Route Structure
- /shop → src/app/shop/page.tsx (or src/app/page.tsx if shop is home)
- /about → src/app/about/page.tsx

## Component Dependencies
- Navbar: used on all pages, imported in layout or each page
- Footer: used on all pages
- ShopHero, AboutHero: page-specific
- FilterSidebar + ProductGrid: shop-only
- All About content sections: about-only
