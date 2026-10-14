import { clubBenefits, clubBenefitsClosing, clubDossier } from "@/config/club";

export function ClubBenefits() {
  return (
    <section className="bg-white px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="max-w-[22ch] text-section-title text-black">
          Lo que dejas de tener que gestionar
        </h2>

        <ul className="mt-8 md:mt-10 max-w-3xl border-t border-black/15">
          {clubBenefits.map((benefit, index) => (
            <li
              key={benefit}
              className="flex items-baseline gap-4 md:gap-8 py-5 border-b border-black/15"
            >
              <span className="text-xs text-black/50 w-6 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-card-title text-black">{benefit}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-base font-medium text-black">
          {clubBenefitsClosing}
        </p>

        <a
          href={clubDossier.href}
          className="mt-6 inline-block text-base text-black underline underline-offset-4 hover:text-black/60 transition-colors"
        >
          {clubDossier.cta}
        </a>
      </div>
    </section>
  );
}
