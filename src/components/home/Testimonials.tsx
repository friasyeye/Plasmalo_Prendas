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
        {/* El bucle recorre la mitad de la cinta (-50%): esa mitad debe ser más ancha
            que cualquier pantalla (2 copias = 2×4×340 px), si no se ve un hueco a la
            derecha. Duración doble para mantener la misma velocidad. */}
        <div className="flex w-max animate-marquee animate-marquee-no-pause [animation-duration:80s]">
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="border-l border-black/10 px-6 py-2 md:px-8 w-[280px] md:w-[340px] shrink-0"
            >
              <p className="text-base text-black leading-relaxed mb-6">
                {testimonial.quote}
              </p>
              <p className="text-base font-semibold text-black leading-tight">
                {testimonial.name}
              </p>
              <p className="text-sm text-gray-500 leading-tight">
                {testimonial.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
