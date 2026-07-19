/**
 * Datos del "chrome" del sitio: navegación, banner superior, footer y contacto.
 *
 * Este archivo es la única fuente de verdad para estos datos. Los componentes
 * de src/components/layout los importan y solo se ocupan de pintarlos.
 * Cuando las categorías vengan de Shopify, se cambia la fuente aquí (o en
 * lib/shopify) sin tocar ningún componente visual.
 */

export const navPrendas = ["Camisetas", "Sudaderas", "Gorras"];

export const navMerchandising = ["Bolsas y tote bags", "Botellas y tazas"];

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
    { label: "Camisetas", href: "#" },
    { label: "Sudaderas", href: "#" },
    { label: "Polos", href: "#" },
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
