"use client";

import Script from "next/script";
import { brandSessionCalendly, brandSessionProcess } from "@/config/brand-session";

// TODO: sustituir por la URL real de Calendly de Plásmalo cuando esté disponible.
const CALENDLY_URL = "https://calendly.com/alexfrias-ia/30min";

export function BrandSessionCalendly() {
  return (
    <section className="bg-[rgb(245,245,245)] px-4 md:px-8 py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-semibold text-black text-2xl md:text-3xl tracking-[-0.02em]">
            {brandSessionCalendly.title}
          </h2>
          <p
            className="mt-3 text-base text-black/60"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            {brandSessionCalendly.description}
          </p>
        </div>

        <div className="mt-8 bg-white border border-black/10 p-2 md:p-4">
          <div
            className="calendly-inline-widget w-full"
            data-url={CALENDLY_URL}
            style={{ minWidth: "0", height: "700px" }}
          />
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
        </div>

        <div className="mt-12 md:mt-14 border-t border-black/10 pt-6">
          <span
            className="text-xs text-black/40 tracking-[0.08em] uppercase"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            Qué incluye la sesión
          </span>

          <div className="mt-4 flex flex-col">
            {brandSessionProcess.map(({ title, description }, index) => (
              <div
                key={title}
                className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 py-4 border-b border-black/10 last:border-b-0"
              >
                <div className="flex items-center gap-4 md:contents">
                  <span
                    className="text-xs text-black/40 w-6 shrink-0"
                    style={{ fontFamily: "var(--font-satoshi)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display font-semibold text-black text-base md:text-lg md:w-56 shrink-0">
                    {title}
                  </span>
                </div>
                <span
                  className="pl-10 md:pl-0 text-sm text-black/60"
                  style={{ fontFamily: "var(--font-satoshi)" }}
                >
                  {description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
