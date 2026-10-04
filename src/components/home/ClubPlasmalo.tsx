import Link from "next/link";

export function ClubPlasmalo() {
  return (
    <section className="bg-[rgb(245,245,245)]">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-4/5 md:aspect-auto md:min-h-[640px] bg-[rgb(225,225,225)] order-1" />

        <div className="flex flex-col justify-start px-6 md:px-16 pt-16 md:pt-24 pb-16 md:min-h-[640px] order-2">
          <h2 className="text-hero text-black max-w-md">
            Club Plásmalo
          </h2>
          <p
            className="mt-4 text-base md:text-lg text-black/70 max-w-md leading-relaxed"
          >
            Tu empresa cambia. Tu equipo crece. Las estaciones cambian. Las
            necesidades evolucionan. Tu imagen también debería hacerlo.
          </p>
          <Link
            href="/club-plasmalo"
            className="mt-8 w-fit rounded-full border border-black bg-black text-white px-5 py-2.5 text-[14px] font-medium hover:bg-transparent hover:text-black transition-colors"
          >
            Descubre el Club →
          </Link>
        </div>
      </div>
    </section>
  );
}
