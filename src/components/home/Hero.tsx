import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-general-sans)",
    fontSize: "clamp(28px, 4vw, 56px)",
    fontWeight: 600,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    color: "white",
    margin: 0,
    padding: 0,
  };

  return (
    // En mobile la altura descuenta TopBar+Navbar (~6rem) y usa svh (altura
    // visible con la barra del navegador desplegada) para que los CTAs
    // queden siempre dentro del primer pantallazo.
    <section className="relative w-full min-h-[calc(100svh-6rem)] md:min-h-screen overflow-hidden">
      {/* Desktop: 3 imágenes en grid */}
      <div className="hidden md:grid absolute inset-0 grid-cols-3">
        <div className="relative h-full w-full">
          <Image
            src="/images/hero_3.jpg"
            alt="Ropa personalizada"
            fill
            priority
            sizes="33vw"
            className="object-cover object-center"
          />
        </div>
        <div className="relative h-full w-full">
          <Image
            src="/images/hero_2.jpg"
            alt="Ropa personalizada"
            fill
            priority
            sizes="33vw"
            className="object-cover object-center"
          />
        </div>
        <div className="relative h-full w-full">
          <Image
            src="/images/hero_1.jpg"
            alt="Ropa personalizada"
            fill
            priority
            sizes="33vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Mobile: solo hero_3 (misma que la primera del desktop) */}
      <div className="md:hidden absolute inset-0">
        <Image
          src="/images/hero_3.jpg"
          alt="Ropa personalizada"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Overlay para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40" />

      {/* Contenido superpuesto */}
      <div className="relative z-10 flex min-h-[calc(100svh-6rem)] md:min-h-screen flex-col justify-end px-6 md:px-8 pb-14 md:pb-40 pt-32">
        {/* Heading */}
        <h1 style={headingStyle}>
          Tu marca merece mucho más <br className="hidden md:block" />
          que ropa personalizada
        </h1>
        {/* Buttons */}
        <div style={{ marginTop: "24px" }} className="flex items-start gap-2 md:gap-3">
          <a
            href="https://wa.me/?text=Hola,%20me%20gustaría%20solicitar%20un%20mockup%20gratis"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-satoshi)" }}
            className="w-fit rounded-full border border-white bg-white text-black px-4 py-2 text-[13px] md:px-5 md:py-2.5 md:text-[14px] shrink-0 cursor-pointer hover:bg-transparent hover:text-white transition-colors text-center"
          >
            Diseña tu pedido
          </a>
          <Link
            href="/prendas"
            style={{ fontFamily: "var(--font-satoshi)" }}
            className="w-fit rounded-full border border-white bg-transparent text-white px-4 py-2 text-[13px] md:px-5 md:py-2.5 md:text-[14px] shrink-0 cursor-pointer hover:bg-white hover:text-black transition-colors text-center"
          >
            Cuéntanos tu proyecto
          </Link>
        </div>
      </div>
    </section>
  );
}
