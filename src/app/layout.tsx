import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { TopBar } from "@/components/layout/TopBar";
import { getTopBarMessages } from "@/lib/shopify/client";
import "./globals.css";

/*
 * Dos familias, como en evolucionia.com: Inter Tight para titulares
 * (--font-inter-tight) e Inter para el cuerpo de texto (--font-inter).
 * next/font/google las auto-hospeda en build time, así que no hay petición a
 * Google en runtime.
 *
 * Los tamaños/pesos concretos viven en la escala tipográfica de globals.css
 * (.text-hero, .text-section-title, …). Los componentes usan esas clases en
 * lugar de declarar font-size o font-weight por su cuenta.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plásmalo | Ropa Personalizada para Empresas y Eventos",
  description: "Personaliza ropa y merchandising para tu empresa o evento. DTF, bordado y diseño a medida,   ▷ Sin pedido mínimo. Envíos a toda España.",
  icons: {
    icon: "/images/logo_plasmalo.png",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topBarMessages = await getTopBarMessages();

  return (
    <html lang="es" className={`${inter.variable} ${interTight.variable}`}>
      <body className="min-h-full">
        <TopBar messages={topBarMessages} />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
