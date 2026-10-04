import { clubClosing } from "@/config/club";

export function ClubClosing() {
  return (
    <section className="bg-white">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-4/5 md:aspect-auto md:min-h-[560px] bg-[rgb(245,245,245)] order-1" />

        <div className="flex flex-col justify-center px-6 md:px-16 py-16 md:py-24 md:min-h-[560px] order-2">
          <h2 className="text-hero text-black max-w-md">
            {clubClosing.title}
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={clubClosing.calendlyHref}
              className="w-fit rounded-full border border-black bg-black text-white px-5 py-2.5 text-[14px] font-medium hover:bg-transparent hover:text-black transition-colors"
            >
              {clubClosing.calendlyCta}
            </a>
            <a
              href={clubClosing.dossierHref}
              className="w-fit rounded-full border border-black bg-transparent text-black px-5 py-2.5 text-[14px] font-medium hover:bg-black hover:text-white transition-colors"
            >
              {clubClosing.dossierCta}
            </a>
          </div>

          <p
            className="mt-10 text-sm text-black/50"
          >
            {clubClosing.brandSessionNote}{" "}
            <a href={clubClosing.brandSessionHref} className="text-black/80 underline hover:text-black transition-colors">
              {clubClosing.brandSessionCta}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
