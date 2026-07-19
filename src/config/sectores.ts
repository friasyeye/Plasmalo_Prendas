import type { HomeCategory } from "@/config/home";

/**
 * Contenido de /sectores/[slug]. Estructura validada con "restaurantes"
 * (piloto de diseño) y replicada para el resto de sectores de config/home.ts
 * (sectors).
 *
 * Los productos son placeholders hardcodeados: aún no está decidido si el
 * grid de cada sector vendrá de una colección real de Shopify (editable por
 * el cliente) o se mantendrá fijo en código. No crear colecciones en Shopify
 * para esto sin confirmarlo antes.
 */

export interface SectorPage {
  slug: string;
  name: string;
  kicker: string;
  title: string;
  tagline: string;
  products: HomeCategory[];
}

export const sectorPages: Record<string, SectorPage> = {
  restaurantes: {
    slug: "restaurantes",
    name: "Restaurantes",
    kicker: "SECTOR RESTAURACIÓN",
    title: "Uniformes que resisten el turno, con tu marca puesta",
    tagline:
      "Delantales, camisetas técnicas y gorras pensados para cocina y sala — cómodos en el servicio, con la imagen de tu restaurante en cada prenda.",
    products: [
      { name: "Camisetas técnicas", img: "/fabfit/category-jerseys.png" },
      { name: "Delantales", img: "/fabfit/category-accessories.png" },
      { name: "Gorras", img: "/fabfit/category-sports.png" },
      { name: "Polos de sala", img: "/fabfit/product-grey-comfort.png" },
    ],
  },
  gimnasios: {
    slug: "gimnasios",
    name: "Gimnasios",
    kicker: "SECTOR FITNESS",
    title: "Equipación técnica que aguanta el ritmo de tu equipo",
    tagline:
      "Camisetas transpirables, sudaderas y gorras para entrenadores y staff — pensadas para moverse, con la marca de tu centro siempre visible.",
    products: [
      { name: "Camisetas técnicas", img: "/fabfit/category-jerseys.png" },
      { name: "Sudaderas", img: "/fabfit/category-accessories.png" },
      { name: "Gorras", img: "/fabfit/category-sports.png" },
      { name: "Polos", img: "/fabfit/product-grey-comfort.png" },
    ],
  },
  constructores: {
    slug: "constructores",
    name: "Constructores",
    kicker: "SECTOR CONSTRUCCIÓN",
    title: "Ropa laboral certificada, con tu marca en obra",
    tagline:
      "Prendas resistentes y certificadas para el día a día en obra — seguridad y presencia de marca en cada equipo que pisa el terreno.",
    products: [
      { name: "Camisetas técnicas", img: "/fabfit/category-jerseys.png" },
      { name: "Sudaderas", img: "/fabfit/category-accessories.png" },
      { name: "Gorras", img: "/fabfit/category-sports.png" },
      { name: "Chalecos", img: "/fabfit/product-grey-comfort.png" },
    ],
  },
  eventos: {
    slug: "eventos",
    name: "Eventos",
    kicker: "SECTOR EVENTOS",
    title: "Tu equipo, identificado y con marca desde el primer minuto",
    tagline:
      "Camisetas y merchandising pensados para producción rápida — ideales para ferias, activaciones y equipos temporales que necesitan verse unidos.",
    products: [
      { name: "Camisetas técnicas", img: "/fabfit/category-jerseys.png" },
      { name: "Gorras", img: "/fabfit/category-sports.png" },
      { name: "Tote bags", img: "/fabfit/category-jerseys.png" },
      { name: "Botellas", img: "/fabfit/product-grey-comfort.png" },
    ],
  },
  oficinas: {
    slug: "oficinas",
    name: "Oficinas",
    kicker: "SECTOR CORPORATIVO",
    title: "Imagen de marca cada día, sin perder comodidad",
    tagline:
      "Polos, sudaderas y merchandising de oficina pensados para el día a día — la identidad de tu empresa presente sin sacrificar confort.",
    products: [
      { name: "Polos", img: "/fabfit/product-grey-comfort.png" },
      { name: "Sudaderas", img: "/fabfit/category-accessories.png" },
      { name: "Tazas", img: "/fabfit/product-grey-comfort.png" },
      { name: "Tote bags", img: "/fabfit/category-jerseys.png" },
    ],
  },
};
