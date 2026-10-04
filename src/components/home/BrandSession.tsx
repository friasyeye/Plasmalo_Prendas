import Image from "next/image";
import Link from "next/link";

interface BrandSessionProps {
  kicker?: string;
  title?: string;
  description?: string;
  cta?: string;
}

export function BrandSession({
  kicker = "Plásmalo Brand Session™",
  title = "Diseñamos la imagen que tu marca transmite",
  description = "Analizamos tu marca y creamos una colección de merchandising alineada con quién eres. Gratis, sin compromiso, 30 minutos.",
  cta = "Reservar mi Brand Session →",
}: BrandSessionProps) {
  return (
    <section className="bg-black">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 md:px-16 py-16 md:py-24 md:min-h-[640px] order-2 md:order-1">
          <span
            className="text-sm text-white/60 tracking-[0.08em] mb-4"
          >
            {kicker}
          </span>
          <h2 className="text-hero text-white max-w-md">
            {title}
          </h2>
          <p
            className="mt-4 text-base md:text-lg text-white/70 max-w-md"
          >
            {description}
          </p>
          <Link
            href="/brand-session"
            className="mt-8 w-fit rounded-full border border-white bg-white text-black px-5 py-2.5 text-[14px] font-medium hover:bg-transparent hover:text-white transition-colors"
          >
            {cta}
          </Link>
        </div>

        <div className="relative aspect-4/5 md:aspect-auto md:min-h-[640px] bg-[rgb(30,30,30)] order-1 md:order-2">
          <Image
            src="/images/brand-session.png"
            alt="Sesión de Brand Session de Plásmalo"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
