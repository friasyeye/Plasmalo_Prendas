/**
 * Contenido de /prendas/camisetas: grid de modelos de camiseta.
 * Placeholder hasta tener las variantes reales como productos de Shopify.
 */

export interface CamisetaModel {
  name: string;
  badge: string;
  description: string;
  reference: string;
  img: string;
  href: string;
}

export interface CamisetaTrustBadge {
  icon: "ShieldCheck" | "Sparkles" | "Palette" | "Timer";
  title: string;
  description: string;
}

export const camisetaTrustBadges: CamisetaTrustBadge[] = [
  {
    icon: "ShieldCheck",
    title: "Tejidos premium",
    description: "Seleccionamos las mejores marcas y materiales.",
  },
  {
    icon: "Sparkles",
    title: "Impresión profesional",
    description:
      "DTF, bordado o serigrafía. Tu logo, con la máxima calidad y resistencia.",
  },
  {
    icon: "Palette",
    title: "Colores que perduran",
    description: "Colores sólidos y vibrantes incluso después de muchos lavados.",
  },
  {
    icon: "Timer",
    title: "Producción ágil",
    description: "Plazos rápidos y sin sorpresas.",
  },
];

export const camisetaModels: CamisetaModel[] = [
  {
    name: "Essential™",
    badge: "La más recomendada",
    description: "La más versátil. Perfecta para el día a día de tu empresa.",
    reference: "SOL'S Regent",
    img: "/fabfit/category-jerseys.png",
    href: "#",
  },
  {
    name: "Premium™",
    badge: "Premium",
    description: "Para empresas que buscan una imagen más elegante.",
    reference: "Stanley/Stella Creator 2.0",
    img: "/fabfit/category-jerseys.png",
    href: "#",
  },
  {
    name: "Performance™",
    badge: "Performance",
    description: "Técnica y transpirable. Ideal para deporte y uso intensivo.",
    reference: "Stanley/Stella Sporty",
    img: "/fabfit/category-sports.png",
    href: "#",
  },
  {
    name: "Eco™",
    badge: "Eco",
    description: "Algodón orgánico y materiales responsables con el planeta.",
    reference: "Stanley/Stella Stella Expresser",
    img: "/fabfit/category-jerseys.png",
    href: "#",
  },
  {
    name: "Work™",
    badge: "Work",
    description: "Alta resistencia para el trabajo diario.",
    reference: "SOL'S Workwear",
    img: "/fabfit/category-accessories.png",
    href: "#",
  },
  {
    name: "Event™",
    badge: "Event",
    description: "Perfecta para promociones, eventos y campañas.",
    reference: "SOL'S Imperial",
    img: "/fabfit/product-grey-comfort.png",
    href: "#",
  },
];
