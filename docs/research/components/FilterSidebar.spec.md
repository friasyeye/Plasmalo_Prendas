# FilterSidebar Specification

## Overview
- **Target file:** `src/components/FilterSidebar.tsx`
- **Interaction model:** click-driven (expand/collapse sections, check filters)

## Visual Description
Left sidebar approximately 280px wide. Has a "Shop" heading with a "Relevance" sort dropdown on the same row. Below: collapsible filter sections (Category, Material, Sustainability, Size, Color), each with a chevron toggle. Separated by thin horizontal lines.

## DOM Structure
```
aside.filter-sidebar (width: 280px, flex-shrink: 0, padding-right: 40px)
  div.shop-sort-row (flex, justify-between, align-items: center, pb: 16px, border-bottom: 1px solid #e5e5e5)
    span → "Shop" (14px, font-weight: 500)
    div.sort-wrapper (flex items-center gap: 6px)
      span → "Relevance" (14px, color: #767676)
      ChevronDown icon (12px)

  [For each filter section: Category, Material, Sustainability, Size, Color]
  div.filter-section (border-bottom: 1px solid #e5e5e5, py: 16px)
    button.section-header (flex justify-between w-full cursor-pointer)
      span.section-title → e.g. "Category" (14px, font-weight: 500, color: #000)
      ChevronDown/Up icon (12px)
    div.section-content (when expanded, mt: 12px)
      [For checkbox filters: Category, Material, Sustainability]
        div.checkbox-row (flex items-center gap: 10px, py: 6px)
          div.custom-checkbox (w: 16px, h: 16px, border: 1px solid #ccc, flex-shrink: 0)
          label → "Men's" (14px, color: #000)

      [For Size section]
        div.size-grid (display: grid, grid-template-columns: repeat(4, 1fr), gap: 4px)
          button.size-btn → "35", "36", ... "46" (border: 1px solid #e5e5e5, h: 36px, text: 12px)

      [For Color section]
        div.color-swatches (flex flex-wrap gap: 8px)
          button.color-swatch (w: 24px, h: 24px, border-radius: 50%, border: 2px solid transparent)
```

## Computed Styles

### Sidebar container
- width: 280px
- paddingRight: 40px
- flexShrink: 0

### Sort row
- display: flex
- justifyContent: space-between
- alignItems: center
- paddingBottom: 16px
- borderBottom: 1px solid rgb(229, 229, 229)

### Section heading ("Shop")
- fontSize: 14px
- fontWeight: 500
- color: rgb(0, 0, 0)

### Sort value ("Relevance")
- fontSize: 14px
- color: rgb(118, 118, 118)

### Filter section headers (e.g., "Category")
- fontSize: 14px
- fontWeight: 500
- color: rgb(0, 0, 0)
- cursor: pointer

### Custom checkbox
- width: 16px
- height: 16px
- border: 1px solid rgb(200, 200, 200)
- borderRadius: 2px
- backgroundColor: white
- flexShrink: 0

### Checkbox labels
- fontSize: 14px
- color: rgb(0, 0, 0)

### Size buttons
- border: 1px solid rgb(229, 229, 229)
- height: 36px
- fontSize: 12px
- color: rgb(0, 0, 0)
- backgroundColor: white
- cursor: pointer

## States & Behaviors

### Filter section collapse/expand
- **Trigger:** click on section header
- **State A (collapsed):** section content hidden, ChevronDown icon
- **State B (expanded):** section content visible, ChevronUp icon
- **Transition:** instant or 150ms ease

### Checkbox selection
- **Trigger:** click checkbox or label
- **State A:** unchecked (white bg, gray border)
- **State B:** checked (black bg, white checkmark or border changes)

### Default expanded sections
- Category: expanded
- Material: expanded  
- Sustainability: expanded
- Size: expanded
- Color: expanded (all sections visible by default)

## Filter Content (verbatim)

**Category:** Men's | Women's | Unisex

**Material:** Recycled Plastic Bottles | Organic Cotton | Natural Rubber | Sugarcane EVA | Vegan Leather | Recycled Foam Insoles

**Sustainability:** Vegan | Recycled | Carbon Neutral | Non-toxic Dyes | Organic

**Size:** 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46

**Color:** 4+ color swatches (pink, purple, red, yellow seen — implement as colored circles)

**Sort options:** Relevance | A-Z | Z-A | Price (lowest first) | Price (highest first) | Newest | Best Selling

## Responsive Behavior
- **Desktop:** visible left sidebar, 280px wide
- **Mobile:** hidden, accessible via a filter button/drawer
