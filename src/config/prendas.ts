/**
 * Contenido de /prendas: selección de categoría de producto.
 * Placeholder hasta tener colecciones reales de Shopify por categoría.
 */

export interface PrendaCategory {
  name: string;
  description: string;
  img: string;
  href: string;
}

export const prendaCategories: PrendaCategory[] = [
  {
    name: "Camisetas",
    description: "La prenda más versátil para cualquier ocasión.",
    img: "/fabfit/category-jerseys.png",
    href: "/prendas/camisetas",
  },
  {
    name: "Polos",
    description: "Elegancia y comodidad para tu día a día.",
    img: "/fabfit/category-sports.png",
    href: "#",
  },
  {
    name: "Sudaderas",
    description: "Abrígate con estilo y lleva tu marca lejos.",
    img: "/fabfit/category-accessories.png",
    href: "#",
  },
  {
    name: "Chaquetas",
    description: "Protección y estilo para cualquier entorno.",
    img: "/fabfit/product-grey-comfort.png",
    href: "#",
  },
  {
    name: "Tote Bags",
    description: "Tu marca, a donde quiera que vayan.",
    img: "/fabfit/category-jerseys.png",
    href: "#",
  },
  {
    name: "Gorras",
    description: "El detalle que completa tu look.",
    img: "/fabfit/category-sports.png",
    href: "#",
  },
];

export interface TrustBadge {
  icon: "Truck" | "ShieldCheck" | "Sparkles" | "Headset";
  title: string;
  description: string;
}

export const trustBadges: TrustBadge[] = [
  {
    icon: "Truck",
    title: "Producción rápida",
    description: "Entrega en 4-7 días laborables.",
  },
  {
    icon: "ShieldCheck",
    title: "Calidad premium",
    description: "Seleccionamos las mejores marcas y materiales.",
  },
  {
    icon: "Sparkles",
    title: "Personalización experta",
    description: "DTF, bordado y más técnicas de alta calidad.",
  },
  {
    icon: "Headset",
    title: "Atención personalizada",
    description: "Te acompañamos en todo el proceso.",
  },
];
