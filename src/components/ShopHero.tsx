export function ShopHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: "460px" }}>
      <img
        src="/images/shop-hero-bg.png"
        alt="Shop hero"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute bottom-8 left-10">
        <h1 className="text-white font-normal leading-none" style={{ fontSize: "48px" }}>
          Shop Sustainable Sneakers
        </h1>
      </div>
    </section>
  );
}
