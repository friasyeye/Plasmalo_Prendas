import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { TopBar } from "@/components/layout/TopBar";
import { getTopBarMessages } from "@/lib/shopify/client";
import "./globals.css";

const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
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
    <html lang="es" className={`${generalSans.variable} ${satoshi.variable}`}>
      <body className="min-h-full">
        <TopBar messages={topBarMessages} />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
