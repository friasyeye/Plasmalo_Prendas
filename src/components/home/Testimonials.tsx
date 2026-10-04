import Image from "next/image";
import { testimonials } from "@/config/home";

export function Testimonials() {
  return (
    <section className="bg-[#FAFAFA] px-4 md:px-8 pt-16 pb-8 md:pb-10">
      <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
        <p className="text-section-title text-black mb-4">
          ¿Sabías que la ropa que llevas habla por ti antes de que digas una
          sola palabra?
        </p>
        <p className="text-card-title text-black mb-5">
          En Plásmalo creamos prendas para marcas, equipos y personas que
          entienden que los detalles importan. Llevamos años haciéndolo bien.
        </p>
        <p className="text-body text-gray-600">
          Tan bien, que nos dicen cosas como estas:
        </p>
      </div>

      <div
        className="overflow-hidden -mx-4 md:-mx-8 px-4 md:px-8 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      >
        <div className="flex w-max gap-6 animate-marquee">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="bg-white border border-gray-200 rounded-none p-10 w-[320px] md:w-[400px] shrink-0"
            >
              {/* Top row: avatar + name/role */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-base font-semibold text-black leading-tight">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 leading-tight">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p
                className="text-base text-black italic mb-5 leading-relaxed"
              >
                {testimonial.quote}
              </p>

              {/* Stars */}
              <span style={{ color: "rgb(255, 193, 7)", fontSize: "1.25rem" }}>
                ★★★★★
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
