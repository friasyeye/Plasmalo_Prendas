import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { homeCategories } from "@/config/home";

export function Categories() {
  return (
    <section className="bg-white px-8 py-16">
      <h2
        style={{
          fontFamily: "var(--font-general-sans)",
          fontSize: "36px",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
        className="text-black mb-8"
      >
        Elige la prenda y hazla tuya
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
        <div />
        <div className="flex justify-end md:col-start-4">
          <button className="text-sm font-medium text-black bg-black/10 rounded-full px-4 py-2">
            Ver todo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {homeCategories.map(({ name, img }) => (
          <div key={name} className="cursor-pointer group">
            <div className="relative h-[220px] md:h-[340px] bg-[rgb(245,245,245)] overflow-hidden">
              <Image
                src={img}
                alt={name}
                fill
                className="object-contain p-2 md:p-8"
              />
            </div>
            <div className="flex justify-between items-center pt-3 pb-1">
              <h3
                style={{
                  fontFamily: "var(--font-general-sans)",
                  fontSize: "26px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
                className="text-black"
              >
                {name}
              </h3>
              <ArrowUpRight size={24} className="text-black" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
