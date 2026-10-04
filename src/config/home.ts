/**
 * Contenido de la Home hoy hardcodeado (fase de maqueta visual).
 *
 * Las categorías del grid y los testimonials se moverán a datos reales
 * (Shopify / contenido propio) más adelante; mientras tanto viven aquí
 * para que los componentes de src/components/home sean solo presentación.
 */

export interface HomeCategory {
  name: string;
  img: string;
  /** Segunda imagen (p. ej. de un producto real de Shopify) que sustituye a `img` en hover. */
  hoverImg?: string;
  /** Slug del producto en Shopify; si existe, la tarjeta enlaza a /product/[handle]. */
  handle?: string;
}

/**
 * Placeholders estáticos del grid "Elige la prenda y hazla tuya". La Home
 * (src/app/page.tsx) pinta los productos reales de la colección "destacados"
 * de Shopify y rellena con estos placeholders hasta completar 4 tarjetas.
 */
export const placeholderHomeCategories: HomeCategory[] = [
  { name: "Sudaderas", img: "/fabfit/category-accessories.png" },
  { name: "Gorras", img: "/fabfit/category-sports.png" },
  { name: "Bolsas y tote bags", img: "/fabfit/product-grey-comfort.png" },
  { name: "Botellas y tazas", img: "/fabfit/product-grey-comfort.png" },
];

export interface Sector {
  name: string;
  img: string;
  /** Texto corto mostrado sobre la imagen. */
  tagline: string;
  /** Slug de /sectores/[slug]. */
  slug: string;
}

export const sectors: Sector[] = [
  {
    name: "Restauración",
    img: "/images/restaurantes.png",
    tagline: "Uniformes que resisten el turno",
    slug: "restaurantes",
  },
  {
    name: "Deporte & Fitness",
    img: "/images/gimnasios.jpg",
    tagline: "Viste tu equipo, construye una comunidad",
    slug: "gimnasios",
  },
  {
    name: "Industria & Construcción",
    img: "/images/Construcción.png",
    tagline: "Imagen profesional, preparada para el trabajo real",
    slug: "constructores",
  },
  {
    name: "Eventos & Ocio",
    img: "/images/eventos.jpg",
    tagline: "Haz que cada evento deje huella",
    slug: "eventos",
  },
  {
    name: "Empresas & Oficinas",
    img: "/images/oficina.png",
    tagline: "Tu equipo también es parte de tu marca",
    slug: "oficinas",
  },
  {
    name: "Marcas & Creadores",
    img: "/images/marcas_y_creadores.jpg",
    tagline: "Convierte tu identidad en algo que la gente quiera llevar",
    slug: "marcas-y-creadores",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

// OJO: contenido placeholder del template original (en inglés, avatares de
// stock). Sustituir por testimonials reales de Plásmalo antes de lanzar.
export const testimonials: Testimonial[] = [
  {
    name: "Rohan Kapoor",
    role: "Verified Buyer",
    quote: '"Fast delivery and amazing products! The quality exceeded my expectations."',
    avatar: "/fabfit/avatar-rohan.png",
  },
  {
    name: "Aanay Mehta",
    role: "Verified Buyer",
    quote: '"Didn\'t expect it to be this good. Fast delivery and solid quality."',
    avatar: "/fabfit/avatar-aanay.png",
  },
  {
    name: "Sofia Martinez",
    role: "Verified Buyer",
    quote: '"Quality feels premium and delivery was quick. No complaints."',
    avatar: "/fabfit/avatar-sofia.png",
  },
  {
    name: "Emily Carter",
    role: "Verified Buyer",
    quote: '"Came fast, packed well, and works great. Would buy again."',
    avatar: "/fabfit/avatar-emily.png",
  },
];
