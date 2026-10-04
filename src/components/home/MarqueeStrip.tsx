/*
 * Franja de texto grande en movimiento continuo (derecha→izquierda), estilo
 * ticker. Dos mensajes repetidos con separación amplia (sin punto/icono
 * entre ellos, a diferencia del marquee de Testimonials).
 */
export function MarqueeStrip() {
  const messages = ["Envío nacional gratis +50€", "Producción en 4-8 días"];

  return (
    <section className="bg-white overflow-hidden py-6 md:py-8">
      <div className="flex items-center w-max gap-24 animate-marquee animate-marquee-no-pause">
        {[...Array(4)].flatMap((_, repeatIndex) =>
          messages.map((message) => (
            <span
              key={`${repeatIndex}-${message}`}
              className="text-hero text-black shrink-0 whitespace-nowrap text-[clamp(40px,9vw,72px)] leading-none"
            >
              {message}
            </span>
          ))
        )}
      </div>
    </section>
  );
}
