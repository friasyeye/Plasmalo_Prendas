# About Page Specification

## Overview
- **Target file:** `src/app/about/page.tsx` + individual section components
- **Interaction model:** mostly static; timeline has horizontal scroll navigation

## Page Sections (top to bottom)

---

### 1. AboutHero
**Target:** `src/components/AboutHero.tsx`

Full-bleed dark B&W geometric image. Silhouette of runner on right half. Sharp geometric diagonal shadow line across image. White H1 bottom-left.

**DOM:**
```
section.about-hero (position: relative, width: 100%, height: 460px, overflow: hidden)
  img (absolute fill, object-fit: cover, object-position: right center)
  div.hero-content (absolute, bottom: 32px, left: 40px)
    h1 → "Rethinking Footwear" (48px, white, weight 400)
```

**Image:** Needs to be downloaded from the About page. Use a placeholder dark gradient if image not available.

---

### 2. AboutFullPhoto
**Target:** inline in page.tsx or `src/components/AboutFullPhoto.tsx`

Full-width editorial photo of a man walking with a vintage carrying case in an industrial building. A horizontal yellow/gold stripe runs across the image.

**DOM:**
```
div.full-photo (width: 100%, height: 480px, overflow: hidden)
  img (w: 100%, h: 100%, object-fit: cover, object-position: center)
```

---

### 3. StorySection
**Target:** `src/components/StorySection.tsx`

Text-only section on white background. Centered content, max-width ~730px.

**DOM:**
```
section.story (py: 80px, px: 24px)
  div.story-inner (max-width: 730px, margin: 0 auto)
    h2 → "A Journey with Purpose" (32px, weight 400, mb: 24px)
    p → "In a world overflowing with plastic waste..." (16px, line-height: 1.7, mb: 16px)
    p.pullquote → '"What if your next favorite pair of sneakers could help clean the planet?"' (font-style: italic, font-size: 18px, font-weight: 500, mb: 24px)
    p × 3 (body text paragraphs)
```

**Text content:**
- H2: "A Journey with Purpose"
- Para 1: "In a world overflowing with plastic waste and fast fashion, Refeet was born from a simple yet powerful question:"
- Pullquote: "\"What if your next favorite pair of sneakers could help clean the planet?\""
- Para 2: "Our founder, a lifelong outdoor enthusiast and sustainability advocate, saw the staggering effects of plastic pollution during a trip to coastal South Asia. The beaches were littered with bottles, the ocean choked with waste — and it struck a nerve. That moment became the catalyst for change."
- Para 3: "With a mission to create a shoe that treads lightly on the Earth while delivering maximum comfort and style, Refeet was founded — turning discarded plastic bottles into premium sneakers designed for everyday movement."
- Para 4: "We believe sustainability doesn't have to sacrifice performance or aesthetics."
- Para 5: "That's why every pair of Refeet shoes is ethically made, environmentally driven, and thoughtfully designed — from the materials to the message."

---

### 4. Timeline
**Target:** `src/components/Timeline.tsx`
**Interaction model:** horizontal scroll with left/right arrow navigation

Horizontal scrolling section showing milestones. Left/right chevron arrows for navigation. Dark colored progress bar below. Each card has year + title + description.

**DOM:**
```
section.timeline (py: 80px, overflow: hidden)
  div.timeline-header (flex, justify-between, align-items: center, px: 80px, mb: 32px)
    h2 → "Our Journey" or similar
    div.nav-arrows (flex gap: 8px)
      button.arrow-prev → ‹
      button.arrow-next → ›
  div.timeline-track (display: flex, gap: 24px, overflow-x: auto, px: 80px, scrollbar: hidden)
    div.timeline-card × 6 (min-width: 300px, flex-shrink: 0, p: 24px, border: 1px solid #e5e5e5)
      span.year (12px, color: #767676, text-transform: uppercase, letter-spacing: 0.08em)
      h3.title (18px, font-weight: 500, mt: 8px)
      p.desc (14px, color: #767676, mt: 8px, line-height: 1.6)
```

**Timeline data:**
```
[
  { year: "2019", title: "The Spark", desc: "Our founder visits South Asia and sees the devastating impact of plastic waste firsthand." },
  { year: "2020", title: "R&D Begins", desc: "Partnered with eco-labs to create our first sneaker upper from 85% recycled plastic bottles." },
  { year: "2021", title: "First Product Launched", desc: "EcoLite Trail sneaker debuts and sells out in 72 hours, proving strong demand for change." },
  { year: "2022", title: "B-Corp Pending & Carbon Offsetting", desc: "Started B-Corp certification and introduced carbon-neutral shipping to reduce our footprint." },
  { year: "2023", title: "Expanded Line", desc: "Launched new styles with bamboo lining, cotton laces & added more unisex sneaker designs." },
  { year: "Milestone", title: "1 Million Bottles Saved", desc: "Hit 1 million bottles saved and transformed into sustainable Refeet shoes around the world." }
]
```

---

### 5. MissionValues
**Target:** `src/components/MissionValues.tsx`

Light gray background section. H2 heading, then 2-column cards. Each card: icon + title + description.

**DOM:**
```
section.mission (py: 80px, backgroundColor: rgb(246, 247, 247))
  div.inner (max-width: 1200px, mx: auto, px: 80px)
    h2 → "Our Mission & Values" (32px, weight 400, mb: 48px)
    div.values-grid (display: grid, grid-template-columns: repeat(2, 1fr), gap: 24px)
      div.value-card × 4 (p: 40px, backgroundColor: white)
        div.icon (mb: 24px) [SVG icon ~32px]
        h3.title (20px, weight 500, mb: 12px, color: #000)
        p.desc (14px, color: #767676, line-height: 1.6)
```

**Value cards:**
- ♻️ "We believe every step counts." — "From recycled materials to carbon-neutral shipping, sustainability isn't a feature — it's our foundation. Every product we design is a small step toward a cleaner planet."
- 🌍 "People matter as much as the planet." — "We partner only with manufacturers who ensure safe working conditions, fair wages, and ethical labor practices across every step of production."
- (2 more cards likely present below fold — use same pattern)

---

### 6. Team
**Target:** `src/components/Team.tsx`

Team member grid. Each member: photo placeholder + name + role.

**Team members:**
- Co-Founder & CEO (name not shown in extraction)
- Nina Patel — Supply Chain Manager
- Leo Kim — Design Director
- Jada Thompson — Community Lead

---

### 7. Testimonials
**Target:** `src/components/Testimonials.tsx`

3 testimonial cards in a row.

**Testimonials:**
- "Lightweight, breathable, and they go with everything. Already bought my second pair." — Marco L.
- "Ridiculously comfortable from day one and I love knowing they're made from recycled materials." — Jasmine T.
- "The closed-loop return program sealed the deal for me. Great shoes, greater mission." — Priya D.

---

### 8. CTASection
**Target:** `src/components/CTASection.tsx`

Dark or light background CTA with headline + button + email subscribe.

**Content:**
- Headline: "Join the movement toward lighter footprints and better choices."
- Button: "Shop The Collection" (dark button, white text)
- Sub-section: "Get exclusive offers, product launches & sustainable living tips."
- Email input + "Subscribe" button

---

## Styles shared across about sections

### Section padding
- padding: 80px 0

### Max-width container
- max-width: 1200px (or 1440px with 80px px)
- margin: 0 auto

### H2 section headings
- fontSize: 32px
- fontWeight: 400
- color: rgb(0, 0, 0)
- marginBottom: 48px

### Body text
- fontSize: 14px–16px
- color: rgb(0, 0, 0) or rgb(118, 118, 118) for secondary
- lineHeight: 1.6–1.7
