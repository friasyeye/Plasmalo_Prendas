import Image from "next/image";
import Link from "next/link";

export function ClubPlasmalo() {
  return (
    <section className="relative bg-black">
      <Image
        src="/images/sabes-lo-que-quieres.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex flex-col items-center text-center px-6 py-20 md:py-28">
        <h2 className="text-hero text-white max-w-2xl">
          Tu empresa cambia, tu imagen también debería hacerlo
        </h2>
        <p className="mt-4 text-base md:text-lg text-white/70 max-w-md">
          Una membresía anual para empresas: planificamos tu merchandising de
          todo el año y te lo entregamos cada mes o cada trimestre.
        </p>
        <Link
          href="/club-plasmalo"
          className="mt-8 w-fit rounded-full border border-white bg-white text-black px-5 py-2.5 text-[14px] font-medium hover:bg-white/85 hover:border-white/85 transition-colors"
        >
          Descubre el Club
        </Link>
      </div>
    </section>
  );
}
