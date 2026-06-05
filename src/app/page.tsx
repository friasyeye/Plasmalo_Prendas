import Image from "next/image";
import { TestimonialsScroll } from "@/components/TestimonialsScroll";

export default function Home() {
  return (
    <main>
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&q=80&auto=format&fit=crop"
          alt="Ropa personalizada para empresas"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">
          <h1
            className="text-white font-normal leading-[1.08] max-w-[700px]"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            Ropa personalizada para empresas que marca la diferencia.
          </h1>
          <p
            className="text-white/75 mt-4 whitespace-nowrap leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}
          >
            Tu equipo lleva puesta tu marca. Nosotros nos aseguramos de que se vea bien.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
            <div className="flex flex-col gap-1">
              <a
                href="/shop"
                className="px-7 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors text-center" style={{ borderRadius: "12px" }}
              >
                Ver prendas
              </a>
              <span className="text-[11px] invisible">·</span>
            </div>
            <div className="flex flex-col gap-1">
              <a
                href="/contacto"
                className="px-7 py-3 border border-white/60 text-white text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-colors flex items-center justify-center gap-2" style={{ borderRadius: "12px" }}
              >
                Pide tu mockup gratis
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}>
                  <line x1="1.5" y1="10.5" x2="10.5" y2="1.5" />
                  <polyline points="3.5,1.5 10.5,1.5 10.5,8.5" />
                </svg>
              </a>
              <span className="text-white/45 text-[11px] tracking-wide text-left">* Sin compromiso · En 24h</span>
            </div>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-normal uppercase tracking-wide" style={{ color: "rgb(23, 28, 27)" }}>
            Productos destacados
          </h2>
          <a
            href="/shop"
            className="hidden sm:inline-flex text-sm font-medium border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
          >
            Ver todo el catálogo
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Camiseta corporativa",
              desc: "100% algodón · Bordado o serigrafía",
              img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80&auto=format&fit=crop",
            },
            {
              name: "Sudadera con capucha",
              desc: "Fleece 320g · Personalización frontal y trasera",
              img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&auto=format&fit=crop",
            },
            {
              name: "Polo de trabajo",
              desc: "Piqué técnico · Bordado en pecho",
              img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=80&auto=format&fit=crop",
            },
          ].map((product) => (
            <article key={product.name} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-[rgb(246,247,247)]" style={{ aspectRatio: "4/5" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.img}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium text-black">{product.name}</p>
                <p className="text-xs text-gray-400 mt-1">{product.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA móvil */}
        <div className="mt-10 sm:hidden text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-black border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
          >
            Ver todo el catálogo
          </a>
        </div>
      </section>

      {/* Manifiesto + Testimonios */}
      <section className="bg-white py-24 px-6 md:px-12">
        <div className="max-w-[780px] mx-auto text-center mb-16">
          <p
            className="font-normal leading-[1.7]"
            style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "rgb(23, 28, 27)" }}
          >
            En Plásmalo creemos que la ropa que llevas habla por ti antes de que digas una sola palabra. Creamos prendas para marcas, equipos y personas que entienden que los detalles importan. Y llevamos años haciéndolo para clientes que vuelven.
          </p>
          <p
            className="mt-8 leading-relaxed text-gray-400"
            style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}
          >
            Mejor que te lo cuenten quiénes ya han pasado por aquí:
          </p>
        </div>
        <TestimonialsScroll />
      </section>
    </main>
  );
}
