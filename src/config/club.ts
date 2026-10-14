/**
 * Contenido de /club-plasmalo. Copy confirmado con el cliente (David) tras
 * reunión — ver docs de la conversación. Las frases marcadas como literales
 * no deben reescribirse sin volver a preguntar.
 */

export const clubIntro = {
  kicker: "CLUB PLÁSMALO",
  title: "Tu empresa nunca debería quedarse sin imagen.",
  subtitle:
    "Mientras tú diriges tu empresa, nosotros dirigimos el calendario de tu imagen.",
  description:
    "El Club Plásmalo es una membresía anual para empresas: pagas por adelantado un año de merchandising y nosotros planificamos y te hacemos llegar el merch acordado de forma periódica, mensual o trimestral. Sin que tengas que volver a pensar en ello.",
};

export const clubHowItWorks = {
  intro:
    "Planificamos contigo el calendario de tu imagen para todo el año. Tú eliges la regularidad (mensual o trimestral) y nosotros nos encargamos de que el merch llegue a tiempo, según la estacionalidad de tu negocio y tus eventos clave.",
  flexibility:
    "¿Tienes una feria o un pico de contrataciones? Adelantamos o ajustamos la entrega sin que tengas que gestionarlo tú.",
  exampleLabel: "Un ejemplo de año tipo",
};

export interface ClubTimelineStep {
  period: string;
  item: string;
}

export const clubTimeline: ClubTimelineStep[] = [
  { period: "Primavera", item: "Camisetas y polos" },
  { period: "Verano", item: "Gorras" },
  { period: "Otoño", item: "Camisetas" },
  { period: "Invierno", item: "Sudaderas" },
];

export const clubBenefits: string[] = [
  "10% de descuento en cualquier pedido adicional fuera del plan anual",
  "Prioridad de producción frente a pedidos normales",
  "Diseñador dedicado para tus necesidades puntuales",
];

export const clubBenefitsClosing =
  "Pertenecer al Club Plásmalo deja de ser un problema para ti.";

export const clubDossier = {
  cta: "Descargar dossier",
  href: "#",
};
