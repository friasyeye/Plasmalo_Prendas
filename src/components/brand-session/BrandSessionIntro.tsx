import { brandSessionIntro } from "@/config/brand-session";

export function BrandSessionIntro() {
  return (
    <section className="bg-black px-4 md:px-8 py-16 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <span
          className="text-sm text-white/60 tracking-[0.08em]"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          {brandSessionIntro.kicker}
        </span>
        <h1 className="mt-3 font-display font-semibold text-white text-3xl md:text-5xl tracking-[-0.02em]">
          {brandSessionIntro.title}
        </h1>
        <p
          className="mt-4 text-base md:text-lg text-white/70 leading-relaxed"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          {brandSessionIntro.description}
        </p>
        <p
          className="mt-3 text-sm md:text-base font-medium text-white/50"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          {brandSessionIntro.audience}
        </p>
      </div>
    </section>
  );
}
