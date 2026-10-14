import { brandSessionApproach } from "@/config/brand-session";

export function BrandSessionApproach() {
  return (
    <section className="bg-black px-4 md:px-8 pt-10 md:pt-12 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="max-w-[22ch] text-section-title text-white">
          {brandSessionApproach.title}
        </h2>

        <div className="mt-8 md:mt-10 max-w-xl flex flex-col gap-5">
          {brandSessionApproach.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base text-white/70 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
