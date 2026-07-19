import { Check } from "lucide-react";
import { clubBenefits, clubBenefitsClosing } from "@/config/club";

export function ClubBenefits() {
  return (
    <section className="bg-[rgb(245,245,245)] px-4 md:px-8 py-16 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display font-semibold text-black text-3xl md:text-4xl tracking-[-0.02em]">
          Lo que dejas de tener que gestionar
        </h2>

        <ul className="mt-10 flex flex-col gap-4 text-left">
          {clubBenefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 bg-white border border-black/10 px-5 py-4"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </span>
              <span
                className="text-sm md:text-base text-black/80"
                style={{ fontFamily: "var(--font-satoshi)" }}
              >
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        <p
          className="mt-8 text-base md:text-lg font-medium text-black"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          {clubBenefitsClosing}
        </p>
      </div>
    </section>
  );
}
