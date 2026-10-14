/**
 * Navegación principal: ÚNICA fuente de datos del Navbar (escritorio y móvil).
 *
 * - "link": enlace directo.
 * - "menu": en escritorio abre un mega-menú al pasar el ratón con las
 *   MEGA_MENU_FEATURED primeras entradas como tarjetas con imagen, más una
 *   tarjeta "Descubrir todo" (viewAllHref). Para cambiar las destacadas basta
 *   con reordenar `items`. En móvil se listan todas las entradas.
 *
 * Una entrada sin `image` se pinta con un placeholder gris: cuando lleguen
 * las fotos, solo hay que añadir aquí la ruta, sin tocar componentes.
 */
import { sectors } from "@/config/home";
import { prendasSection } from "@/config/catalog";

export interface NavMenuItem {
  label: string;
  href: string;
  image?: string;
  /** La imagen es una foto de producto: se muestra entera (contain), no recortada. */
  contain?: boolean;
  /**
   * Foto de un producto de Shopify (handle y, opcional, color) para la tarjeta.
   * La resuelve el Navbar en servidor; si falla, queda el placeholder gris.
   */
  photo?: { handle: string; color?: string };
}

export interface NavLinkEntry {
  type: "link";
  label: string;
  href: string;
}

export interface NavMenuEntry {
  type: "menu";
  label: string;
  /**
   * Destino al pulsar el título del menú en escritorio (el hover sigue
   * abriendo el mega-menú). Sin él, el título solo abre el menú.
   */
  href?: string;
  viewAllHref: string;
  items: NavMenuItem[];
}

export type NavEntry = NavLinkEntry | NavMenuEntry;

/** Tarjetas destacadas en el mega-menú de escritorio (más "Descubrir todo"). */
export const MEGA_MENU_FEATURED = 3;

/** Entradas sin página propia todavía: enlazan a "#" hasta que se creen. */
const pending = (labels: string[]): NavMenuItem[] =>
  labels.map((label) => ({ label, href: "#" }));

/**
 * Foto de las tarjetas del mega-menú de Prendas, por categoría. Solo se ven
 * las de las MEGA_MENU_FEATURED primeras categorías; una sin foto sale gris.
 */
const prendasMenuPhotos: Record<string, NavMenuItem["photo"]> = {
  sudaderas: { handle: "sudadera-con-capucha-snake", color: "Gris mezcla" },
  chaquetas: { handle: "chaqueta-softshell-replay-women", color: "Negro" },
  camisetas: { handle: "camiseta-regent", color: "Army" },
};

export const navigation: NavEntry[] = [
  {
    type: "menu",
    label: "Prendas",
    href: prendasSection.basePath,
    viewAllHref: prendasSection.basePath,
    // Mismas categorías y orden que la franja de /prendas (config/catalog.ts).
    items: prendasSection.categories.map(({ slug, label }) => ({
      label,
      href: `${prendasSection.basePath}/${slug}`,
      photo: prendasMenuPhotos[slug],
    })),
  },
  {
    type: "menu",
    label: "Merchandising",
    viewAllHref: "#",
    items: pending([
      "Bolsas",
      "Mochilas",
      "Libretas",
      "Escritura",
      "Botellas/Termo",
      "Tazas",
      "Lanyards",
      "Llaveros",
    ]),
  },
  {
    type: "menu",
    label: "Sectores",
    href: "/sectores",
    viewAllHref: "/sectores",
    // Se enlaza por slug (no por nombre: los nombres de home.ts y sectores.ts
    // no coinciden, y buscar por nombre dejaba todos los enlaces en "#").
    items: sectors.map(({ name, slug, img }) => ({
      label: name,
      href: `/sectores/${slug}`,
      image: img,
    })),
  },
  { type: "link", label: "Brand Session", href: "/brand-session" },
  { type: "link", label: "Club Plásmalo", href: "/club-plasmalo" },
];
