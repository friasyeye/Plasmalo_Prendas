import Image from "next/image";

const sellos = [
  "/images/sello-fairwear.svg",
  "/images/sello-peta-vegan.png",
  "/images/sello-amfori.png",
  "/images/sello-cascale.png",
  "/images/sello-oeko-tex.png",
];

export function ResponsibleManufacturing() {
  return (
    <section className="bg-[#FAFAFA] px-4 md:px-8 pt-2 pb-12 md:pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-sm md:text-base font-medium text-black/60 tracking-[0.04em]"
        >
          Ropa fabricada con responsabilidad
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-7 md:gap-10 opacity-60 grayscale">
          {sellos.map((src, index) => (
            <div key={src} className="relative h-11 w-11 md:h-14 md:w-14 shrink-0">
              <Image
                src={src}
                alt={`Sello de certificación ${index + 1}`}
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
