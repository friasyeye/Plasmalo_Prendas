/**
 * Cabecera de /sectores: solo texto, fondo blanco y mismo padding horizontal
 * que la grid de debajo, para que ambas lean como una sola sección.
 */
export function SectoresHero() {
  return (
    <section className="bg-white px-4 md:px-8 pt-24 md:pt-28 pb-8 md:pb-10">
      <span className="text-sm text-black/50 tracking-[0.08em]">SECTORES</span>
      <h1 className="mt-3 text-hero text-black max-w-2xl">
        Ropa personalizada para cada sector
      </h1>
      <p className="mt-4 text-body text-black/60 max-w-xl">
        Uniformes, textil corporativo y merchandising a medida para
        restauración, deporte, construcción, eventos, oficinas y marcas. Elige
        tu sector y descubre qué podemos hacer por tu equipo.
      </p>
    </section>
  );
}
