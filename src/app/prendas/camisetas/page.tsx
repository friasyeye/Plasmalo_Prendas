import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Sparkles, Palette, Timer } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandSession } from "@/components/home/BrandSession";
import { camisetaModels, camisetaTrustBadges } from "@/config/camisetas";

const trustIcons = { ShieldCheck, Sparkles, Palette, Timer };

export default function CamisetasPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
            <span
              className="text-sm text-black/50 tracking-[0.08em]"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              Camisetas
            </span>
            <h1 className="mt-2 font-display font-semibold text-black text-3xl md:text-5xl tracking-[-0.02em]">
              Elige la camiseta que mejor se adapta a tu proyecto
            </h1>
            <p
              className="mt-3 text-base md:text-lg text-black/60"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              Hemos seleccionado las mejores opciones según el uso, la imagen
              y el rendimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
            {camisetaModels.map(
              ({ name, badge, description, reference, img, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="group flex flex-col bg-[rgb(245,245,245)] overflow-hidden"
                >
                  <div className="relative aspect-4/5 overflow-hidden">
                    <Image
                      src={img}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 90vw, 30vw"
                      className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col flex-1 px-5 pb-5">
                    <span
                      className="text-xs uppercase tracking-[0.06em] text-black/50 mb-1"
                      style={{ fontFamily: "var(--font-satoshi)" }}
                    >
                      {badge}
                    </span>
                    <h2 className="font-display font-semibold text-black text-xl tracking-[-0.01em]">
                      {name}
                    </h2>
                    <p
                      className="mt-1 text-sm text-black/60"
                      style={{ fontFamily: "var(--font-satoshi)" }}
                    >
                      {description}
                    </p>
                    <p
                      className="mt-1 text-xs text-black/40"
                      style={{ fontFamily: "var(--font-satoshi)" }}
                    >
                      {reference}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-black">
                      Ver detalles
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>

          <p className="text-center mt-8 md:mt-10">
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
              style={{ fontFamily: "var(--font-satoshi)" }}
            >
              ¿No encuentras tu modelo? Ver catálogo completo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto mt-12 md:mt-20">
            {camisetaTrustBadges.map(({ icon, title, description }) => {
              const Icon = trustIcons[icon];
              return (
                <div key={title} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-11 h-11 shrink-0 border border-black/10 bg-[rgb(245,245,245)]">
                    <Icon className="w-5 h-5 text-black" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-black text-sm md:text-base">
                      {title}
                    </h3>
                    <p
                      className="mt-0.5 text-xs md:text-sm text-black/60"
                      style={{ fontFamily: "var(--font-satoshi)" }}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <BrandSession
          title="¿No sabes qué camiseta elegir?"
          description="Te ayudamos a encontrar el modelo perfecto para tu marca. Gratis, sin compromiso, 30 minutos."
        />
      </main>
      <Footer />
    </>
  );
}
