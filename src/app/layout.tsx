import type { Metadata } from "next";
import { Bebas_Neue, Spline_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FabFit | Effortless Shopping, Exceptional Choices",
  description: "FabFit — your destination for jerseys, accessories, and sports gear. Effortless shopping, exceptional choices.",
  icons: {
    icon: "/seo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${splineSans.variable}`}>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
