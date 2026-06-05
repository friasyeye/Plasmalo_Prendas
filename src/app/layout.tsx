import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ropa Personalizada para Empresas | Taller en Barcelona",
  description: "Tu equipo, tu imagen. Ropa corporativa personalizada para empresas que quieren ser reconocidas allí donde vayan. [ Mockup gratuito ] Solo producimos cuando das el visto bueno.",
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
