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
  cta = "Reservar mi Brand Session",
}: BrandSessionProps) {
  return (
    <section className="bg-black">
      <div className="flex flex-col items-center text-center px-6 py-20 md:py-28">
        <span className="text-sm text-white/60 tracking-[0.08em] mb-4">
          {kicker}
        </span>
        <h2 className="text-hero text-white max-w-2xl">
          {title}
        </h2>
        <p className="mt-4 text-base md:text-lg text-white/70 max-w-md">
          {description}
        </p>
        <Link
          href="/brand-session"
          className="mt-8 w-fit rounded-full border border-white bg-white text-black px-5 py-2.5 text-[14px] font-medium hover:bg-transparent hover:text-white transition-colors"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
