import { clubHowItWorks, clubTimeline } from "@/config/club";

export function ClubTimeline() {
  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-section-title text-black">
          Cómo funciona
        </h2>

        <p
          className="mt-4 text-base md:text-lg text-black/70 max-w-xl leading-relaxed"
        >
          {clubHowItWorks.intro}
        </p>
        <p
          className="mt-3 text-base md:text-lg text-black/70 max-w-xl leading-relaxed"
        >
          {clubHowItWorks.flexibility}
        </p>

        <div className="mt-12 md:mt-14 border-t border-black/10 pt-6">
          <span
            className="text-xs text-black/40 tracking-[0.08em] uppercase"
          >
            {clubHowItWorks.exampleLabel}
          </span>

          <div className="mt-4 flex flex-col">
            {clubTimeline.map(({ period, item }, index) => (
              <div
                key={period}
                className="flex items-center gap-4 md:gap-8 py-4 border-b border-black/10 last:border-b-0"
              >
                <span
                  className="text-xs text-black/40 w-6 shrink-0"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-card-title text-black w-28 md:w-36 shrink-0">
                  {period}
                </span>
                <span
                  className="text-sm md:text-base text-black/60"
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
