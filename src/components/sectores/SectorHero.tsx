import type { SectorPage } from "@/config/sectores";

interface SectorHeroProps {
  sector: SectorPage;
}

export function SectorHero({ sector }: SectorHeroProps) {
  return (
    <section className="bg-black">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 md:px-16 py-16 md:py-24 md:min-h-[560px] order-2 md:order-1">
          <span
            className="text-sm text-white/60 tracking-[0.08em] mb-4"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            {sector.kicker}
          </span>
          <h1 className="font-display font-semibold text-white text-3xl md:text-5xl tracking-[-0.02em] max-w-lg">
            {sector.title}
          </h1>
          <p
            className="mt-4 text-base md:text-lg text-white/70 max-w-md leading-relaxed"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            {sector.tagline}
          </p>
        </div>

        <div className="relative aspect-4/5 md:aspect-auto md:min-h-[560px] bg-[rgb(30,30,30)] order-1 md:order-2" />
      </div>
    </section>
  );
}
