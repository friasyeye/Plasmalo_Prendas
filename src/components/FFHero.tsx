import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function FFHero() {
  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-bebas-neue)",
    fontSize: "clamp(60px, 7.5vw, 108px)",
    fontWeight: 400,
    lineHeight: 0.95,
    color: "black",
    margin: 0,
    padding: 0,
  };

  return (
    <section>
      {/* Part 1 — Text hero */}
      <div className="w-full bg-white px-8 pt-20 pb-6">
        {/* Line 1: full width */}
        <div style={headingStyle}>
          EFFORTLESS{" "}
          <span style={{ color: "rgb(251, 126, 36)" }}>SHOPPING</span>{" "}
          EXCEPTIONAL
        </div>
        {/* Line 2: CHOICES + button side by side */}
        <div className="flex items-center justify-between" style={{ marginTop: "4px" }}>
          <div style={headingStyle}>CHOICES</div>
          <button
            style={{ fontFamily: "var(--font-spline-sans)", fontSize: "16px" }}
            className="flex items-center gap-2 border border-black bg-transparent text-black px-6 py-3 shrink-0 cursor-pointer hover:bg-black hover:text-white transition-colors"
          >
            Shop Now
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* Part 2 — Hero image */}
      <div className="w-full h-[420px] relative overflow-hidden">
        <Image
          src="/fabfit/hero-image.png"
          alt="FabFit fashion"
          fill
          priority
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
