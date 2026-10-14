import { brandSessionIntro } from "@/config/brand-session";

export function BrandSessionIntro() {
  return (
    // pt = padding original + 4rem del navbar, que va encima en modo "overlay".
    // relative z-10: la sección de Calendly se solapa un poco hacia arriba y no debe tapar la línea.
    <section className="relative z-10 bg-black px-4 md:px-8 pt-32 md:pt-40">
      <div className="max-w-6xl mx-auto">
        <h1 className="max-w-[26ch] text-hero text-white">
          {brandSessionIntro.title}
        </h1>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 pb-6 border-b border-white/30">
          <div className="max-w-xl">
            <p className="text-base text-white/70 leading-relaxed">
              {brandSessionIntro.description}
            </p>
            <p className="mt-3 text-xs text-white/50">
              {brandSessionIntro.note}
            </p>
          </div>

          <span className="self-start md:self-auto shrink-0 whitespace-nowrap border-l-2 border-white/60 pl-4 py-2 text-sm font-medium text-white tracking-[0.08em]">
            {brandSessionIntro.kicker}
          </span>
        </div>
      </div>
    </section>
  );
}
