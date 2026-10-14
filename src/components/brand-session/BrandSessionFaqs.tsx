import { Plus } from "lucide-react";
import { brandSessionFaqs } from "@/config/brand-session";

export function BrandSessionFaqs() {
  return (
    <section className="bg-white px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-section-title text-black">
          {brandSessionFaqs.title}
        </h2>

        <div className="mt-8 md:mt-10 border-t border-black/15">
          {brandSessionFaqs.items.map(({ question, answer }) => (
            <details key={question} className="group border-b border-black/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-card-title text-black [&::-webkit-details-marker]:hidden">
                {question}
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-black/50 transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="pb-6 max-w-2xl text-base text-black/60 leading-relaxed">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
