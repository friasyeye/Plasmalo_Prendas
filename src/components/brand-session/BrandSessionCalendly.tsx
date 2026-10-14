"use client";

import { useRef } from "react";
import Script from "next/script";

// Colores del widget: fondo negro y texto blanco para integrarlo en la sección oscura.
const CALENDLY_URL =
  "https://calendly.com/plasmaloprendas/30min?hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=ffffff";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export function BrandSessionCalendly() {
  const containerRef = useRef<HTMLDivElement>(null);

  // widget.js solo busca los `.calendly-inline-widget` al cargarse. Con navegación
  // interna (Link) el script ya está cargado y no vuelve a ejecutarse, así que el
  // widget quedaba vacío. `onReady` se dispara en cada montaje y lo inicializamos
  // a mano; vaciar el contenedor evita un segundo iframe (React Strict Mode).
  const initWidget = () => {
    const container = containerRef.current;
    if (!container || !window.Calendly) return;
    container.replaceChildren();
    window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: container });
  };

  return (
    <section className="bg-black px-4 md:px-8">
      {/* El margen negativo compensa el margen superior propio del iframe de Calendly. */}
      <div className="max-w-6xl mx-auto -mt-4 md:-mt-8">
        <div ref={containerRef} className="w-full min-w-0 h-175" />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
          onReady={initWidget}
        />
      </div>
    </section>
  );
}
