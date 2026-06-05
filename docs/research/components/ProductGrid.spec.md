# ProductGrid + ProductCard Specification

## Overview
- **Target files:** `src/components/ProductGrid.tsx`, `src/components/ProductCard.tsx`
- **Interaction model:** static display (no live filtering in this static clone — show all products)

## Visual Description
3-column product grid. Each card has a light gray image area (portrait aspect ratio ~1:1.38), with the sneaker centered. Below the image a single row shows: product name (left) + price (right). No border or shadow on cards.

## ProductGrid DOM Structure
```
div.product-grid (flex-1, display: grid, grid-template-columns: repeat(3, 1fr), gap: 1px or 24px)
  ProductCard × 10
```

## ProductCard DOM Structure
```
article.product-card (cursor: pointer)
  div.card-image (backgroundColor: rgb(246, 247, 247), aspectRatio: ~0.72 or padding-bottom: 138%, position: relative, overflow: hidden)
    img (position: absolute, inset: 0, width: 100%, height: 100%, object-fit: contain, padding: 16px)
  div.card-info (display: flex, justify-content: space-between, align-items: center, padding: 12px 0 0)
    span.product-name (fontSize: 14px, color: rgb(0,0,0), fontWeight: 400)
    span.product-price (fontSize: 14px, color: rgb(0,0,0), fontWeight: 400)
```

## Computed Styles

### Product grid
- display: grid
- gridTemplateColumns: repeat(3, 1fr)
- gap: 24px
- flex: 1

### Product card
- cursor: pointer
- backgroundColor: transparent

### Card image area
- backgroundColor: rgb(246, 247, 247)
- position: relative
- overflow: hidden
- paddingBottom: 138% (to maintain ~0.72 portrait aspect ratio)
- OR use aspect-ratio: 172/238

### Product image
- position: absolute
- top: 0; left: 0
- width: 100%
- height: 100%
- objectFit: contain
- padding: 16px

### Card info row
- display: flex
- justifyContent: space-between
- alignItems: center
- paddingTop: 12px
- paddingBottom: 0px

### Product name
- fontSize: 14px
- fontWeight: 400
- color: rgb(0, 0, 0)

### Product price
- fontSize: 14px
- fontWeight: 400
- color: rgb(0, 0, 0)

## Product Data (verbatim)
```
[
  { name: "Breeze Mesh Trainers",       price: "109.00", image: "/images/product-breeze-mesh-trainers.png" },
  { name: "EcoLite Trail Shoes",        price: "129.00", image: "/images/product-ecolite-trail-shoes.png" },
  { name: "Canyon Runner Sneakers",     price: "129.00", image: "/images/product-canyon-runner-sneakers.png" },
  { name: "Wave Knit Slip-Ons",         price: "109.00", image: "/images/product-wave-knit-slip-ons.png" },
  { name: "TerraFlex Everyday Sneaker", price: "105.00", image: "/images/product-terraflex-everyday-sneaker.png" },
  { name: "CoreLoop Classic",           price: "110.00", image: "/images/product-coreloop-classic.png" },
  { name: "CloudTread Urban Walker",    price: "120.00", image: "/images/product-cloudtread-urban-walker.png" },
  { name: "BreatheLite Mesh Trainer",   price: "89.00",  image: "/images/product-breathelite-mesh-trainer.png" },
  { name: "EcoStrider Trail Grip",      price: "125.00", image: "/images/product-ecostrider-trail-grip.png" },
  { name: "Give the Gift of Refeet",    price: "50.00",  image: "/images/product-gift-card.jpg" }
]
```

## States & Behaviors

### Hover state
- **Trigger:** mouse hover on card
- **Behavior:** slight image scale or subtle opacity change (implement as `hover:opacity-90` or `hover:scale-[1.02]` on image)

## Responsive Behavior
- **Desktop (1440px):** 3 columns, gap 24px
- **Tablet (768px):** 2 columns
- **Mobile (390px):** 1 column or 2 columns
- **Breakpoint:** switches at ~768px

## Assets
All product images in `public/images/product-*.png` (and .jpg for gift card)
