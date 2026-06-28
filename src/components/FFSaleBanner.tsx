import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function FFSaleBanner() {
  return (
    <section
      className="relative overflow-hidden w-full h-[500px]"
      style={{ backgroundColor: "rgb(228, 228, 228)" }}
    >
      {/* Left model */}
      <div className="absolute bottom-0 left-0 w-[280px]">
        <Image
          src="/fabfit/sale-model-left.png"
          alt="Sale model"
          width={280}
          height={400}
          className="object-contain object-bottom"
        />
      </div>

      {/* Right model */}
      <div className="absolute bottom-0 right-0 w-[280px]">
        <Image
          src="/fabfit/sale-model-right.png"
          alt="Sale model"
          width={280}
          height={400}
          className="object-contain object-bottom"
        />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p
          style={{
            fontFamily: "var(--font-bebas-neue)",
            fontSize: "48px",
            letterSpacing: "0.15em",
            color: "black",
          }}
        >
          SALE IS ON
        </p>
        <p
          style={{
            fontFamily: "var(--font-bebas-neue)",
            fontSize: "96px",
            lineHeight: 1,
            color: "black",
          }}
        >
          45% OFF
        </p>
        <p
          style={{
            fontFamily: "var(--font-spline-sans)",
            fontSize: "16px",
            marginTop: "8px",
            color: "black",
          }}
        >
          45% off on all winter wear using code #fabfit25.
        </p>
        <button
          className="mt-6 border border-black bg-transparent text-black px-8 py-3 flex items-center gap-2 text-base cursor-pointer hover:bg-black hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-spline-sans)" }}
        >
          Shop Now <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  );
}
