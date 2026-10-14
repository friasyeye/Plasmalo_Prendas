/**
 * Datos del "chrome" del sitio: banner superior, footer y contacto.
 * (La navegación principal vive en config/navigation.ts.)
 *
 * Este archivo es la única fuente de verdad para estos datos. Los componentes
 * de src/components/layout los importan y solo se ocupan de pintarlos.
 */

/**
 * Dominio de producción. Base de las URLs absolutas de los metadatos
 * (canónicas, Open Graph): una canónica debe llevar el dominio completo.
 */
export const siteUrl = "https://plasmalo.es";

/**
 * Fallback si el metafield custom.topbar_messages (Shop, Shopify) no existe
 * o falla la petición. La fuente de verdad real la gestiona el cliente desde
 * el admin de Shopify (ver getTopBarMessages en lib/shopify/client.ts).
 */
export const topBarMessages = [
  "Sin pedido mínimo",
  "Envío gratis desde 50€",
  "Producción en 4-7 días",
];

export interface FooterLink {
  label: string;
  href: string;
}

export const footerLinks: { catalogo: FooterLink[]; legal: FooterLink[] } = {
  catalogo: [
    { label: "Camisetas", href: "/prendas/camisetas" },
    { label: "Sudaderas", href: "/prendas/sudaderas" },
    { label: "Polos", href: "/prendas/polos" },
  ],
  legal: [
    { label: "FAQ", href: "#" },
    { label: "Política de Privacidad", href: "#" },
    { label: "Términos de Servicio", href: "#" },
    { label: "Política de Devoluciones", href: "#" },
    { label: "Envíos", href: "#" },
  ],
};

export const contactInfo = {
  tagline:
    "Creemos que cada prenda cuenta una historia. Por eso en Plásmalo combinamos diseño, calidad y cercanía para que tu proyecto, equipo o marca luzcan exactamente como los imaginas.",
  instagram: {
    handle: "@plasmalo_prendas",
    url: "https://instagram.com/plasmalo_prendas",
  },
  whatsapp: {
    label: "+34 632 742 050",
    url: "https://wa.me/34632742050",
  },
  email: "esperandocorreo@gmail.com",
  location: "Barcelona, España",
};
