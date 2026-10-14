/**
 * Contenido de /brand-session. Consultoría gratuita de 30 min (lead magnet),
 * primer escalón del funnel antes del Club Plásmalo (ver config/club.ts).
 */

export const brandSessionIntro = {
  kicker: "PLÁSMALO BRAND SESSION™",
  title: "Diseñamos la imagen que tu marca transmite",
  description:
    "Para empresas que buscan algo único: analizamos tu marca y diseñamos una colección de merchandising hecha a tu medida.",
  note: "* Sesión de 30 minutos, gratuita y sin compromiso.",
};

export const brandSessionApproach = {
  title:
    "Muchas empresas encargan merchandising sin saber qué dice su marca, ni qué prenda tiene sentido para su equipo.",
  paragraphs: [
    "Nuestro enfoque es distinto. Antes de proponerte nada, conocemos tu empresa y entendemos qué representa tu marca de verdad.",
    "Solo entonces diseñamos tu colección: qué prendas, qué personalización y dónde va cada detalle, pensado para tu equipo y tu identidad. Porque no se trata de poner un logo en una camiseta.",
    "Se trata de que tu marca se vea bien en quien la lleva, con una propuesta hecha a tu medida y lista para valorar.",
  ],
};

export interface BrandSessionFaq {
  question: string;
  answer: string;
}

export const brandSessionFaqs = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Es realmente gratis?",
      answer:
        "Sí. Son 30 minutos sin coste y sin compromiso. Si después quieres seguir adelante, te lo explicamos con claridad. Si no, no pasa nada.",
    },
    {
      question: "¿Cómo es la sesión?",
      answer:
        "Es una videollamada de 30 minutos. Nos cuentas quién eres, cómo es tu equipo y qué quieres transmitir. Nosotros hacemos las preguntas que ayudan a entender tu marca.",
    },
    {
      question: "¿Qué necesito preparar?",
      answer:
        "Nada obligatorio. Si tienes logotipo, colores o ejemplos de lo que te gusta, nos ayuda, pero no hace falta llegar con nada hecho.",
    },
    {
      question: "¿Qué recibo al terminar?",
      answer:
        "Una propuesta de colección de merchandising diseñada para tu empresa, lista para valorar.",
    },
    {
      question: "¿Para qué tipo de empresas es?",
      answer:
        "Para empresas que buscan algo único, no autoservicio. Si quieres una colección pensada para tu marca y no una plantilla genérica, esta sesión es para ti.",
    },
  ] satisfies BrandSessionFaq[],
};
