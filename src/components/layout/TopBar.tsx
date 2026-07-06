import "./TopBar.css";

const REPETITIONS = 6;

export function TopBar() {
  const separator = (
    <span className="mx-7 text-white/60 select-none" aria-hidden="true">
      ·
    </span>
  );

  const bannerContent = (
    <>
      <span>Sin pedido mínimo</span>
      {separator}
      <span>Envío gratis desde 50€</span>
      {separator}
      <span>Producción en 4-7 días</span>
    </>
  );

  const bannerGroup = (hidden: boolean) => (
    <div className="banner-group flex shrink-0" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPETITIONS }).map((_, i) => (
        <div key={i} className="flex items-center">
          {bannerContent}
          {separator}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="w-full bg-black text-white text-xs py-2 overflow-hidden"
      style={{ fontFamily: "var(--font-satoshi)" }}
    >
      <div className="banner-scroll flex whitespace-nowrap">
        {/* Primer grupo */}
        {bannerGroup(false)}
        {/* Segundo grupo (seamless loop) */}
        {bannerGroup(true)}
      </div>
    </div>
  );
}
