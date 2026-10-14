import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    // La altura descuenta solo el TopBar (~2rem): el Navbar va encima del
    // hero (variant="overlay"). Usa svh (altura visible con la barra del
    // navegador desplegada) para que el hero llene justo el primer pantallazo.
    <section className="relative w-full min-h-[calc(100svh-2rem)] overflow-hidden">
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
      <div className="relative z-10 flex min-h-[calc(100svh-2rem)] flex-col justify-end px-6 md:px-8 pb-14 md:pb-40 pt-32">
        {/* Heading */}
        <h1 className="text-hero text-white m-0 p-0">
          Tu marca merece mucho más <br className="hidden md:block" />
          que ropa personalizada
        </h1>
        {/* Buttons */}
        <div style={{ marginTop: "24px" }} className="flex items-start gap-2 md:gap-3">
          <a
            href="https://wa.me/?text=Hola,%20me%20gustaría%20solicitar%20un%20mockup%20gratis"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full border border-white bg-white text-black px-4 py-2 text-[13px] md:px-5 md:py-2.5 md:text-[14px] shrink-0 cursor-pointer hover:bg-white/85 hover:border-white/85 transition-colors text-center"
          >
            Pide tu mockup gratis
          </a>
          <Link
            href="/prendas"
            className="w-fit rounded-full border border-white bg-transparent text-white px-4 py-2 text-[13px] md:px-5 md:py-2.5 md:text-[14px] shrink-0 cursor-pointer hover:bg-white hover:text-black transition-colors text-center"
          >
            Ver prendas
          </Link>
        </div>
      </div>
    </section>
  );
}
