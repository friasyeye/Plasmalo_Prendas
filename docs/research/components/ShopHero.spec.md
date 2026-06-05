# ShopHero Specification

## Overview
- **Target file:** `src/components/ShopHero.tsx`
- **Interaction model:** static

## Visual Description
Full-bleed black-and-white photo of a tennis player mid-action, covering the full viewport width and approximately 460px tall. White H1 text "Shop Sustainable Sneakers" sits in the bottom-left over the dark image.

## DOM Structure
```
section.shop-hero (position: relative, width: 100%, height: 460px, overflow: hidden)
  img (position: absolute, inset: 0, width: 100%, height: 100%, object-fit: cover, object-position: center)
  div.hero-content (position: absolute, bottom: 32px, left: 40px)
    h1 → "Shop Sustainable Sneakers"
```

## Computed Styles

### section.shop-hero
- position: relative
- width: 100%
- height: 460px
- overflow: hidden
- backgroundColor: rgb(0, 0, 0)

### Background image
- position: absolute
- top: 0; left: 0; right: 0; bottom: 0
- width: 100%
- height: 100%
- objectFit: cover
- objectPosition: center top

### h1
- fontSize: 48px
- fontWeight: 400
- fontFamily: "Public Sans", sans-serif
- color: rgb(255, 255, 255)
- lineHeight: 1.1
- letterSpacing: normal
- position: absolute
- bottom: 32px
- left: 40px

## Text Content
- h1: "Shop Sustainable Sneakers"

## Assets
- Hero image: `public/images/shop-hero-bg.png` (1350x759, B&W tennis player)

## Responsive Behavior
- **Desktop:** height 460px, H1 bottom-left at 48px
- **Mobile:** height 300px, H1 font-size 32px
