const textCards = [
  {
    quote: "Pedimos 80 camisetas para el equipo y el resultado fue increíble. El bordado quedó perfecto y las tallas muy fieles. Repetiremos seguro.",
    author: "Laura Moreno",
    role: "Directora de RRHH · Grupo Nexum",
  },
  {
    quote: "Llevábamos años buscando un proveedor que cuidara los detalles. Con Plásmalo la calidad es constante pedido tras pedido.",
    author: "Javier Ríos",
    role: "CEO · Faber Studio",
  },
  {
    quote: "El mockup gratuito fue clave para convencer a dirección. En menos de 24h teníamos la propuesta visual lista.",
    author: "Marta Puig",
    role: "Marketing Manager · Dicom Events",
  },
  {
    quote: "Hicimos el pedido un jueves y el viernes siguiente ya lo teníamos en oficina. Calidad y rapidez, que más se puede pedir.",
    author: "Sergio Andrade",
    role: "Fundador · Startup BCN Hub",
  },
  {
    quote: "Las sudaderas para nuestra última campaña quedaron espectaculares. Los clientes nos preguntan constantemente dónde las hacemos.",
    author: "Neus Ferrer",
    role: "Brand Manager · Mo30 Stands",
  },
  {
    quote: "Gran atención y asesoramiento desde el primer contacto. Nos ayudaron a elegir la mejor técnica para nuestro logo.",
    author: "Carlos Vidal",
    role: "Director Comercial · Tecnoflow",
  },
];

const logoCards = [
  { name: "Mo30 Stands", initials: "MO30" },
  { name: "Fira Barcelona", initials: "FB" },
  { name: "Faber Studio", initials: "FS" },
  { name: "Dicom Events", initials: "DE" },
  { name: "BCN Hub", initials: "BCN" },
  { name: "Nexum Group", initials: "NX" },
];

// Row 1: text · logo · text · logo · text · logo (duplicated for seamless loop)
const row1: Array<{ type: "text"; idx: number } | { type: "logo"; idx: number }> = [
  { type: "text", idx: 0 },
  { type: "logo", idx: 0 },
  { type: "text", idx: 1 },
  { type: "logo", idx: 1 },
  { type: "text", idx: 2 },
  { type: "logo", idx: 2 },
];

// Row 2: logo · text · logo · text · logo · text (duplicated for seamless loop)
const row2: Array<{ type: "text"; idx: number } | { type: "logo"; idx: number }> = [
  { type: "logo", idx: 3 },
  { type: "text", idx: 3 },
  { type: "logo", idx: 4 },
  { type: "text", idx: 4 },
  { type: "logo", idx: 5 },
  { type: "text", idx: 5 },
];

function TextCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="flex-shrink-0 w-[220px] md:w-[260px] bg-black/5 rounded-2xl p-6 flex flex-col justify-between" style={{ height: "320px" }}>
      <p className="text-black/70 text-sm leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4">
        <p className="text-black text-sm font-medium">{author}</p>
        <p className="text-black/40 text-xs mt-0.5">{role}</p>
      </div>
    </div>
  );
}

function LogoCard({ name, initials }: { name: string; initials: string }) {
  return (
    <div className="flex-shrink-0 w-[220px] md:w-[260px] bg-black rounded-2xl flex flex-col items-center justify-center gap-3" style={{ height: "320px" }}>
      <p className="text-white/30 text-xs tracking-widest uppercase">{name}</p>
    </div>
  );
}

function Row({ items, direction }: { items: typeof row1; direction: "left" | "right" }) {
  const doubled = [...items, ...items]; // duplicate for seamless infinite scroll
  const animClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}>
      <div className={`flex gap-4 ${animClass}`} style={{ width: "max-content" }}>
        {doubled.map((item, i) =>
          item.type === "text" ? (
            <TextCard key={i} {...textCards[item.idx]} />
          ) : (
            <LogoCard key={i} {...logoCards[item.idx]} />
          )
        )}
      </div>
    </div>
  );
}

export function TestimonialsScroll() {
  return (
    <>
      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scrollLeft 60s linear infinite;
          will-change: transform;
        }
        .animate-scroll-right {
          animation: scrollRight 60s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-left,
          .animate-scroll-right {
            animation: none;
          }
        }
      `}</style>

      <div className="flex flex-col gap-4">
        <Row items={row1} direction="left" />
        <Row items={row2} direction="right" />
      </div>
    </>
  );
}
