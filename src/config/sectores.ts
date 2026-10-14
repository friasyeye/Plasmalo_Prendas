/**
 * Texto de /sectores/[slug] (H1 y descripción, que también son el SEO de la
 * página). El resto del sector (nombre, etiqueta de Shopify, foto) vive en
 * `sectors` de config/home.ts: el slug es la clave que une las dos.
 */

export interface SectorCopy {
  /** H1 de la página y base del título SEO. */
  title: string;
  description: string;
}

export const sectorCopy: Record<string, SectorCopy> = {
  restaurantes: {
    title: "Uniformes para restauración",
    description:
      "Delantales, camisetas técnicas, polos y gorras personalizados con el logo de tu restaurante, bar o cafetería. Prendas cómodas para el servicio y pensadas para el turno.",
  },
  gimnasios: {
    title: "Ropa personalizada para deporte y fitness",
    description:
      "Camisetas técnicas, sudaderas y polos con el logo de tu gimnasio, club o equipo. Ropa cómoda para entrenar que une a tu comunidad.",
  },
  constructores: {
    title: "Ropa de trabajo personalizada",
    description:
      "Chaquetas, polos, camisetas y gorras con el logo de tu empresa. Imagen profesional y prendas preparadas para el trabajo diario.",
  },
  eventos: {
    title: "Ropa personalizada para eventos",
    description:
      "Camisetas, sudaderas y gorras con tu marca para staff, organización, festivales y promociones. Prendas que dejan huella en cada evento.",
  },
  oficinas: {
    title: "Ropa corporativa personalizada",
    description:
      "Polos, camisas y chaquetas con el logo de tu empresa para tu equipo. Una imagen coherente y cuidada en cada reunión con clientes.",
  },
  "marcas-y-creadores": {
    title: "Merchandising de ropa para marcas y creadores",
    description:
      "Sudaderas, camisetas y gorras con tu identidad para vender o regalar. Convierte tu marca en prendas que la gente quiera llevar.",
  },
};
