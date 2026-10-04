import { clubIntro } from "@/config/club";

export function ClubIntro() {
  return (
    <section className="bg-black">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 md:px-16 py-16 md:py-24 md:min-h-[640px] order-2 md:order-1">
          <span
            className="text-sm text-white/60 tracking-[0.08em] mb-4"
          >
            {clubIntro.kicker}
          </span>
          <h1 className="text-hero text-white max-w-lg">
            {clubIntro.title}
          </h1>
          <p
            className="mt-3 text-base md:text-lg text-white/80 max-w-lg"
          >
            {clubIntro.subtitle}
          </p>
          <p
            className="mt-6 text-sm md:text-base text-white/60 max-w-md leading-relaxed"
          >
            {clubIntro.description}
          </p>
        </div>

        <div className="relative aspect-4/5 md:aspect-auto md:min-h-[640px] bg-[rgb(30,30,30)] order-1 md:order-2" />
      </div>
    </section>
  );
}
