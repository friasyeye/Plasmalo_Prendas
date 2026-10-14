import { clubHowItWorks, clubTimeline } from "@/config/club";

export function ClubTimeline() {
  return (
    <section className="bg-black px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="max-w-[22ch] text-section-title text-white">
          Cómo funciona
        </h2>

        <div className="mt-8 md:mt-10 max-w-xl flex flex-col gap-5">
          <p className="text-base text-white/70 leading-relaxed">
            {clubHowItWorks.intro}
          </p>
          <p className="text-base text-white/70 leading-relaxed">
            {clubHowItWorks.flexibility}
          </p>
        </div>

        <div className="mt-14 md:mt-20">
          <span className="text-xs text-white/50 tracking-[0.08em] uppercase">
            {clubHowItWorks.exampleLabel}
          </span>

          <div className="mt-4 grid md:grid-cols-4 border-t border-white/30">
            {clubTimeline.map(({ period, item }, index) => (
              <div
                key={period}
                className="py-6 md:pr-6 border-b md:border-b-0 border-white/20 last:border-b-0"
              >
                <span className="text-xs text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-6 md:mt-10 text-card-title text-white">{period}</p>
                <p className="mt-1 text-base text-white/60">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
