export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: "460px" }}>
      <img
        src="/images/about-hero-bg.png"
        alt="Rethinking Footwear"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute bottom-8 left-10 z-10">
        <h1 className="text-white font-normal leading-none" style={{ fontSize: "48px" }}>
          Rethinking Footwear
        </h1>
      </div>
    </section>
  );
}
