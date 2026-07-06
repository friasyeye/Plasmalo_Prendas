import Image from "next/image";
import { testimonials } from "@/config/home";

export function Testimonials() {
  return (
    <section className="bg-white px-4 md:px-8 py-16">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p
          className="text-black mb-3"
          style={{
            fontFamily: "var(--font-general-sans)",
            fontSize: "clamp(17px, 4.5vw, 22px)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.35,
          }}
        >
          En Plásmalo creemos que la ropa que llevas habla por ti antes de que
          digas una sola palabra. Creamos prendas para marcas, equipos y
          personas que entienden que los detalles importan. Y llevamos años
          haciéndolo bien.
        </p>
        <p
          className="text-gray-600 font-medium text-xs md:text-sm"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          Tan bien, que nos dicen cosas como estas:
        </p>
      </div>

      <div
        className="overflow-hidden -mx-4 md:-mx-8 px-4 md:px-8 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      >
        <div className="flex w-max gap-4 animate-marquee">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="border border-gray-200 rounded-none p-8 w-[320px] md:w-[380px] shrink-0"
            >
              {/* Top row: avatar + name/role */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div style={{ fontFamily: "var(--font-satoshi)" }}>
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
                className="text-base text-black italic mb-3"
                style={{ fontFamily: "var(--font-satoshi)" }}
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
