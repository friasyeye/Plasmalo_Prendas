import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const categories = [
  { name: "JERSEYS", img: "/fabfit/category-jerseys.png" },
  { name: "ACCESSORIES", img: "/fabfit/category-accessories.png" },
  { name: "SPORTS", img: "/fabfit/category-sports.png" },
];

export function FFCategories() {
  return (
    <section className="bg-white px-8 py-16">
      <h1
        style={{
          fontFamily: "var(--font-bebas-neue)",
          fontSize: "48px",
          fontWeight: 400,
        }}
        className="text-black mb-8"
      >
        Featured Categories:
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {categories.map(({ name, img }) => (
          <div key={name} className="cursor-pointer group">
            <div className="relative h-[340px] bg-[rgb(245,245,245)] overflow-hidden">
              <Image
                src={img}
                alt={name}
                fill
                className="object-contain p-8"
              />
            </div>
            <div className="flex justify-between items-center pt-3 pb-1">
              <h3
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  fontSize: "38px",
                  fontWeight: 700,
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
