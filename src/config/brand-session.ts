/**
 * Contenido de /brand-session. Consultoría gratuita de 30 min (lead magnet),
 * primer escalón del funnel antes del Club Plásmalo (ver config/club.ts).
 */

export const brandSessionIntro = {
  kicker: "PLÁSMALO BRAND SESSION™",
  title: "Diseñamos la imagen que tu marca transmite",
  description:
    "Una consultoría gratuita de 30 minutos, sin compromiso. Analizamos tu marca y diseñamos una propuesta de merchandising hecha a tu medida — el resultado es una colección pensada para tu empresa, no una plantilla genérica.",
  audience: "Pensada para empresas que buscan algo único, no autoservicio.",
};

export const brandSessionCalendly = {
  title: "Reserva tu Brand Session",
  description: "Elige el horario que mejor te encaje. Son 30 minutos, sin compromiso.",
};

export interface BrandSessionStep {
  title: string;
  description: string;
}

export const brandSessionProcess: BrandSessionStep[] = [
  {
    title: "Conocemos tu empresa",
    description: "Hablamos de quién eres, tu equipo y tus objetivos.",
  },
  {
    title: "Analizamos tu identidad",
    description: "Revisamos tu marca para entender qué la representa de verdad.",
  },
  {
    title: "Diseñamos tu colección",
    description: "Creamos una propuesta de merchandising alineada con tu identidad.",
  },
  {
    title: "Te entregamos la propuesta",
    description: "Recibes tu colección diseñada a medida, lista para valorar.",
  },
];
