import Image from "next/image";
import { clubIntro } from "@/config/club";

export function ClubIntro() {
  return (
    // pt = padding original + 4rem del navbar, que va encima en modo "overlay".
    <section className="bg-black px-4 md:px-8 pt-32 md:pt-40">
      <div className="max-w-6xl mx-auto">
        <h1 className="max-w-[26ch] text-hero text-white">{clubIntro.title}</h1>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 pb-6 border-b border-white/30">
          <div className="max-w-xl">
            <p className="text-base text-white/85 leading-relaxed">
              {clubIntro.subtitle}
            </p>
            <p className="mt-3 text-base text-white/60 leading-relaxed">
              {clubIntro.description}
            </p>
          </div>

          <span className="self-start md:self-auto shrink-0 whitespace-nowrap border-l-2 border-white/60 pl-4 py-2 text-sm font-medium text-white tracking-[0.08em]">
            {clubIntro.kicker}
          </span>
        </div>

        <div className="relative mt-8 md:mt-12 aspect-video md:aspect-21/9 overflow-hidden">
          <Image
            src="/images/club-plasmalo-mesa-de-trabajo.png"
            alt="Mesa de trabajo con prendas, muestras de tela y bocetos de una colección de merchandising"
            fill
            sizes="(min-width: 1152px) 72rem, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
