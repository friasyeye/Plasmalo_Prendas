import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Truck, ShieldCheck, Sparkles, Headset } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { prendaCategories, trustBadges } from "@/config/prendas";

const trustIcons = { Truck, ShieldCheck, Sparkles, Headset };

export default function PrendasPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <h1 className="font-display font-semibold text-black text-3xl md:text-5xl tracking-[-0.02em]">
            ¿Qué quieres personalizar?
          </h1>
          <p
            className="mt-3 text-base md:text-lg text-black/60"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            Elige el tipo de producto que mejor se adapta a tu proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
          {prendaCategories.map(({ name, description, img, href }) => (
            <Link
              key={name}
              href={href}
              className="group flex flex-col justify-between bg-[rgb(245,245,245)] p-6 min-h-[280px] md:min-h-[320px]"
            >
              <div>
                <h2 className="font-display font-semibold text-black text-2xl tracking-[-0.01em]">
                  {name}
                </h2>
                <p
                  className="mt-1 text-sm text-black/60 max-w-[220px]"
                  style={{ fontFamily: "var(--font-satoshi)" }}
                >
                  {description}
                </p>
              </div>

              <div className="flex items-end justify-between gap-4">
                <span className="flex items-center justify-center w-9 h-9 border border-black shrink-0 transition-colors group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="relative w-1/2 aspect-square overflow-hidden">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 45vw, 20vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto mt-12 md:mt-20">
          {trustBadges.map(({ icon, title, description }) => {
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
      </main>
      <Footer />
    </>
  );
}
