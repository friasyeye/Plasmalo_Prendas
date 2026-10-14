"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { CatalogProduct } from "@/types";

interface FeaturedProductsProps {
  products: CatalogProduct[];
}

/** Píxeles de arrastre a partir de los cuales deja de ser un clic. */
const DRAG_THRESHOLD = 5;

/**
 * Fila de productos con scroll horizontal. En móvil y trackpad es el scroll
 * nativo; con ratón se arrastra (como Nude Project) y la rueda con Shift
 * también funciona. Las tarjetas son más pequeñas que el ancho, así que la
 * última queda cortada a medias e indica que hay más. El orden es el de la
 * colección "destacados".
 */
export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  if (products.length === 0) return null;

  function handlePointerDown(event: PointerEvent<HTMLUListElement>) {
    const list = listRef.current;
    if (event.pointerType !== "mouse" || event.button !== 0 || !list) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: list.scrollLeft,
      moved: false,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLUListElement>) {
    const list = listRef.current;
    if (!drag.current.active || !list) return;
    const deltaX = event.clientX - drag.current.startX;
    if (Math.abs(deltaX) > DRAG_THRESHOLD) {
      drag.current.moved = true;
      list.style.scrollSnapType = "none"; // el snap pelea con el arrastre
      list.style.cursor = "grabbing";
    }
    if (drag.current.moved) list.scrollLeft = drag.current.startScroll - deltaX;
  }

  function endDrag() {
    const list = listRef.current;
    drag.current.active = false;
    if (list) {
      list.style.scrollSnapType = "";
      list.style.cursor = "";
    }
  }

  return (
    <section className="bg-white pt-2 md:pt-3 pb-4">
      <ul
        ref={listRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        // Tras arrastrar, el clic que sigue no debe abrir el producto.
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="flex snap-x snap-proximity gap-2 md:gap-3 overflow-x-auto scroll-pl-4 md:scroll-pl-8 px-4 md:px-8 pb-4 md:cursor-grab select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <li
            key={product.handle}
            className="w-[42vw] shrink-0 snap-start sm:w-[28vw] md:w-[17vw]"
          >
            <ProductCard
              product={product}
              draggable={false}
              sizes="(max-width: 640px) 42vw, (max-width: 768px) 28vw, 17vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
