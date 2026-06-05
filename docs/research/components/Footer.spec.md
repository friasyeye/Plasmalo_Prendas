# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** static

## Visual Description
Dark near-black footer. Logo + tagline + social icons on the left. Four navigation columns on the right. Copyright row at the very bottom with payment icons.

## DOM Structure
```
footer (bg: rgb(23, 28, 27), color: white, padding: 60px 0 24px)
  div.footer-inner (max-width: 1440px, margin: auto, px: 80px)
    div.footer-top (flex, gap: 80px+)
      div.footer-brand (width: ~300px, flex-shrink: 0)
        img[src="/images/logo.svg"] (white, width: ~40px)
        p.tagline (14px, color: rgba(255,255,255,0.6), mt: 16px, line-height: 1.6)
        div.socials (flex, gap: 16px, mt: 24px)
          [6 social icon links: Facebook, X, Instagram, LinkedIn, YouTube, TikTok]
      div.footer-nav (flex-1, display: grid, grid-template-columns: repeat(4, 1fr), gap: 40px)
        [4 columns: SHOP, COMPANY, EXPLORE, LEGAL]
          p.column-heading (12px, font-weight: 600, letter-spacing: 0.08em, text-transform: uppercase, color: rgba(255,255,255,0.5), mb: 16px)
          ul (flex flex-col, gap: 10px)
            li a (14px, color: rgba(255,255,255,0.7), hover: color white)
    div.footer-bottom (border-top: 1px solid rgba(255,255,255,0.1), mt: 48px, pt: 24px)
      flex justify-between items-center
        p.copyright (12px, color: rgba(255,255,255,0.4))
        div.payment-icons (flex gap: 8px)
          [Visa, Apple Pay, Google Pay, Mastercard icons — small rounded-sm cards]
```

## Computed Styles

### Footer container
- backgroundColor: rgb(23, 28, 27)
- color: rgb(255, 255, 255)
- padding: 64px 0 24px

### Tagline
- fontSize: 14px
- color: rgba(255, 255, 255, 0.65)
- lineHeight: 1.6
- maxWidth: 280px

### Column headings
- fontSize: 12px
- fontWeight: 600
- letterSpacing: 0.08em
- textTransform: uppercase
- color: rgba(255, 255, 255, 0.5)

### Column links
- fontSize: 14px
- color: rgba(255, 255, 255, 0.7)
- hover: color: rgb(255, 255, 255)

### Copyright
- fontSize: 12px
- color: rgba(255, 255, 255, 0.4)

## Text Content (verbatim)

**Tagline:** "Sustainable shoes made for everyday movement. Designed with recycled materials, built for comfort, and committed to leaving a lighter footprint."

**SHOP column:** Home | Shop | Product Details | Lookbook | Wishlist | Find A Store

**COMPANY column:** About | Impact | Careers | Careers Details | Media Kit | Gift Cards

**EXPLORE column:** Journal | Journal Details | Review | Sizing | Contact Us | FAQ

**LEGAL column:** Privacy Policy | Terms of Service | Shipping & Returns | 404 | Affilate | Collaborations

**Copyright:** "Copyright © 2025 Refeet. All rights reserved. Built In Framer By DiverseKit"

**Social links order:** Facebook | X (Twitter) | Instagram | LinkedIn | YouTube | TikTok

## Assets
- Logo: `public/images/logo.svg` (render white via CSS filter or use invert)
- Social icons: Use Lucide React icons (Facebook, Twitter, Instagram, Linkedin, Youtube) — no TikTok in Lucide, use a simple SVG or text
- Payment icons: render as small gray rounded badge outlines with text (Visa, Apple Pay, Google Pay, Mastercard)

## Responsive Behavior
- **Desktop:** brand column left + 4 nav columns right
- **Mobile:** stack brand then nav columns 2x2, copyright stacks vertically
