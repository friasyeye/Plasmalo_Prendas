import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CategoryStripItem {
  label: string;
  href: string;
  active: boolean;
}

/**
 * Franja de categorías (estilo Nude Project): texto en horizontal, la activa
 * subrayada. Son enlaces reales a URLs limpias (buenos para SEO) y no
 * arrastran los filtros: cambiar de categoría empieza de cero.
 * En móvil se desliza con el dedo; la barra de scroll se oculta.
 */
export function CategoryStrip({ items }: { items: CategoryStripItem[] }) {
  return (
    <nav aria-label="Categorías">
      <ul className="flex gap-5 md:gap-7 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map(({ label, href, active }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-block py-3 text-nav border-b transition-colors",
                active
                  ? "text-black border-black"
                  : "text-black/50 border-transparent hover:text-black"
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
